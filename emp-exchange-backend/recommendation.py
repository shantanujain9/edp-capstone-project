import pandas as pd
from sklearn.neighbors import NearestNeighbors
from pymongo import MongoClient
import sys
import json
from bson import ObjectId

def load_data():
    # Connect to MongoDB and load data
    client = MongoClient('mongodb://localhost:27017/')
    db = client.empexchange
    products_collection = db.products

    products = list(products_collection.find())
    return pd.DataFrame(products)

def train_model(data):
    features = data[['popularity', 'durability', 'price']]
    model = NearestNeighbors(n_neighbors=5, algorithm='auto').fit(features)
    return model

def recommend_products(model, product_features):
    distances, indices = model.kneighbors([product_features])
    return indices

if __name__ == "__main__":
    data = load_data()
    model = train_model(data)

    product = json.loads(sys.argv[1])
    product_features = [product['popularity'], product['durability'], product['price']]
    recommendations = recommend_products(model, product_features)
    
    # Convert ObjectId to string
    recommended_products = data.iloc[recommendations[0]].to_dict('records')
    for product in recommended_products:
        product['_id'] = str(product['_id'])

    print(json.dumps(recommended_products))
