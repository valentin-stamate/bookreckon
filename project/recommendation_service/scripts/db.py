from recommendation_service_api.models import Books, Recommendations

import os
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

def recommendation_calc():
    books = Books.json_interest_fields()
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