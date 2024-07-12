from pymongo import MongoClient
from faker import Faker
import random

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017')
db = client.empexchange
products_collection = db.products

# Clear existing data
products_collection.delete_many({})

# Initialize Faker
fake = Faker()

# Generate and insert 1000 dummy products
for _ in range(1000):
    product = {
        'name':fake.word(),
        'category':fake.word(),
        'price': round(random.uniform(10.0,100.0),2),
        'description': fake.sentence(),
        'image': fake.image_url(),
        'popularity': random.randint(0,100),
        'durability': random.randint(0,100),
    }
    products_collection.insert_one(product)

print("Database populated with dummy data")
