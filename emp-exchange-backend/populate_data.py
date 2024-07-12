from pymongo import MongoClient
from faker import Faker
import random

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client.empexchange
products_collection = db.products

# Clear existing data
products_collection.delete_many({})

# Initialize Faker
fake = Faker()

# Define categories
categories = ['Office Supplies', 'Electronics', 'Furniture', 'Books', 'Clothing']

# Define specific product names and descriptions for each category
product_names = {
    'Office Supplies': ['Pen', 'Notebook', 'Stapler', 'Paper', 'File Folder'],
    'Electronics': ['Laptop', 'Smartphone', 'Headphones', 'Monitor', 'Mouse'],
    'Furniture': ['Chair', 'Table', 'Couch', 'Bed', 'Bookshelf'],
    'Books': ['Fiction Novel', 'Science Textbook', 'Biography', 'Mystery Novel', 'Cookbook'],
    'Clothing': ['T-shirt', 'Jeans', 'Jacket', 'Sneakers', 'Hat']
}

product_descriptions = {
    'Office Supplies': ['High quality pen', 'A5 notebook with 200 pages', 'Durable stapler', 'A4 paper pack', 'Standard file folder'],
    'Electronics': ['Powerful laptop', 'Latest smartphone', 'Noise-cancelling headphones', 'High resolution monitor', 'Ergonomic mouse'],
    'Furniture': ['Comfortable office chair', 'Wooden dining table', 'Leather couch', 'Queen size bed', 'Wooden bookshelf'],
    'Books': ['A thrilling fiction novel', 'Comprehensive science textbook', 'Inspiring biography', 'Mystery novel full of suspense', 'Easy-to-follow cookbook'],
    'Clothing': ['Cotton T-shirt', 'Denim jeans', 'Warm jacket', 'Comfortable sneakers', 'Stylish hat']
}

# Generate and insert 1000 dummy products
for _ in range(1000):
    category = random.choice(categories)
    product = {
        'name': random.choice(product_names[category]),
        'category': category,
        'price': round(random.uniform(10.0, 100.0), 2),
        'description': random.choice(product_descriptions[category]),
        'image': fake.image_url(),
        'popularity': random.randint(0, 100),
        'durability': random.randint(0, 100),
    }
    products_collection.insert_one(product)

print("Database populated with dummy data")
