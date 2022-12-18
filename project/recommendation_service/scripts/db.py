from recommendation_service_api.models import Book, Recommendation

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from sklearn.neighbors import NearestNeighbors
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

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