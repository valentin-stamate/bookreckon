from utils.AWSSecretKey import AWSSecretKey
from utils.SearchableEncryption import SearchableEncryptionScheme
from recommendation_service_api.models import Book, Recommendation

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from sklearn.neighbors import NearestNeighbors
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from utils import EncryptedBook, AesPRF, RandomKeyGenerator, BookQuery, AESCipher

def recommendation_calc():
    books = Book.json_interest_fields()
    books = pd.DataFrame.from_dict(books)

    tf = TfidfVectorizer(analyzer='word', ngram_range=(1,2), min_df=0, stop_words='english')
    tfidf_matrix = tf.fit_transform(books['Genre'])

    cosine_similarities = linear_kernel(tfidf_matrix, tfidf_matrix)
    results = dict()

    for i, row in books.iterrows():
        similar_indices = cosine_similarities[i].argsort()[:-100:-1]
        similar_items = [(books['ID'][j]) for j in similar_indices]
        row_id = row['ID']
        results[row_id] = similar_items
        results[row_id].pop(results[row_id].index((row_id)))
    return results

def improved_recommendation_calc(preferences, minimum_rating, genres, user_id):
    # Create a DataFrame from the dictionary of books
    books = Book.json_interest_fields()
    df = pd.DataFrame.from_dict(books)

    minimum_rating = minimum_rating["rating__avg"]

    if genres is None:
        df[(df['Rating'] >= minimum_rating)]
    else:
        # Filter DataFrame to include books that have a higher rating than the minimum rating
        # and have at least one of the genres in the genre list
        df = df[(df['Rating'] >= minimum_rating) & (df['Genre'].isin(genres))]

    if preferences is None:
        df = df.sort_values(by='Rating', ascending=False)
        return df.head(10)

    # Create a matrix of term frequency-inverse document frequency (TF-IDF) values for the book descriptions
    count_vectorizer = CountVectorizer()
    sparse_matrix = count_vectorizer.fit_transform(df['Description'])

    # Create a vector representing the user's preferences
    preferences_vector = count_vectorizer.transform(preferences)

    # Calculate the cosine similarity between the matrix of TF-IDF values and the vector of preferences
    similarities = cosine_similarity(sparse_matrix, preferences_vector)

    df['similarity'] = similarities
    # Sort the DataFrame by the similarity column in descending order
    df = df.sort_values(by='similarities', ascending=False)
    return df.head(10)

def get_query(client_category):
    key_prf = RandomKeyGenerator.generate_symmetric_key(128)

    aes_prf = AesPRF()
    to_query = aes_prf.generate(client_category.encode(), key_prf)

    return to_query, key_prf

def search_recomendation(search_parameter):
    books = Book.json_interest_fields()
    df = pd.DataFrame.from_dict(books)

    enc_books = [EncryptedBook(book.encrypt_genres('>u:I=A0[FFB?I%e1'), book.encrypt_rest('>u:I=A0[FFB?I%e1')) for book in books]
    to_query, key_prf = get_query(search_parameter)
    se = SearchableEncryptionScheme(AESCipher(), AWSSecretKey(), 128, AesPRF())
    for enc_book in enc_books:
        query = BookQuery(se, key_prf, enc_book, to_query)

        if query.query():
            return_list = list(se.cipher.decrypt(enc_book.get_content()))
            # send content to client
            # return return_list

    if search_parameter is None:
        df = df.sort_values(by='Rating', ascending=False)
        return df.head(10)

    count_vectorizer = CountVectorizer()
    sparse_matrix = count_vectorizer.fit_transform(df['Description'])

    search_vector = count_vectorizer.transform(search_parameter)
    similarities = cosine_similarity(sparse_matrix, search_vector)

    df['similarity'] = similarities
    # Sort the DataFrame by the similarity column in descending order
    df = df.sort_values(by='similarities', ascending=False)
    return df.head(10)