from recommendation_service_api.models import Book, Recommendation

import os
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from sklearn.neighbors import NearestNeighbors

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

def improved_recommendation_calc(preferences, minimum_rating, user_id):
    books = Book.json_interest_fields()
    df = pd.DataFrame.from_dict(books)

    minimum_rating = minimum_rating["rating__avg"]

    df["Preferences"] = preferences

    # Use TfidfVectorizer to create a matrix of tf-idf values for the description and preferences columns
    tv = TfidfVectorizer(analyzer='word', ngram_range=(1, 3), min_df=0, stop_words='english')
    tfidf_matrix = tv.fit_transform(df["Description"] + ' ' + df["Preferences"])

    # Calculate the cosine similarity between the tf-idf matrix and itself
    similarity_scores = linear_kernel(tfidf_matrix, tfidf_matrix)

    # Create a new DataFrame with the similarity scores and the genres
    sim_df = pd.DataFrame(similarity_scores, columns=df["Title"], index=df["Title"])
    sim_df["Genre"] = df["Genre"]

    # Filter the DataFrame by the minimum rating and sort it in descending order
    sim_df = sim_df[df["Rating"] >= minimum_rating].sort_values(ascending=False)

    # Use NearestNeighbors to find the 10 closest books based on the genres
    nn = NearestNeighbors(n_neighbors=10, algorithm='true', metric='cosine')
    nn.fit(sim_df["Genre"])
    distances, indices = nn.kneighbors(sim_df["Genre"])

    results = [sim_df.index[index] for index in indices[0][1:]]
    print(results)

# This script uses Pandas to read the books from a CSV file and create a DataFrame. It then gets the input preferences and minimum rating from the user, and adds a new column to the DataFrame with the preferences.

# Next, it uses scikit-learn's TfidfVectorizer to create a matrix of tf-idf values for the description and preferences columns, and calculates the cosine similarity between the tf-idf matrix and itself. This is used to create a new DataFrame with the similarity scores and the genres of each book.

# The DataFrame is then filtered by the minimum rating and sorted in descending order, and scikit-learn's NearestNeighbors is used to find the 10 closest books based on the genres. Finally, the recommended books are printed.