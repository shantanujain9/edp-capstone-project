import random
from faker import Faker
from pymongo import MongoClient

# Initialize Faker
fake = Faker()

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client.empexchange
products_collection = db.products

products_collection.drop()
# Define categories
categories = ['Rain Umbrellas', 'Sun Umbrellas', 'Travel Umbrellas', 'Golf Umbrellas', 'Fashion Umbrellas']

# Define specific product names and descriptions for each category
product_names = {
    'Rain Umbrellas': ['Compact Rain Umbrella', 'Classic Rain Umbrella', 'Windproof Rain Umbrella', 'Large Rain Umbrella', 'Automatic Rain Umbrella'],
    'Sun Umbrellas': ['Beach Sun Umbrella', 'Patio Sun Umbrella', 'Portable Sun Umbrella', 'UV Protection Sun Umbrella', 'Garden Sun Umbrella'],
    'Travel Umbrellas': ['Mini Travel Umbrella', 'Automatic Travel Umbrella', 'Lightweight Travel Umbrella', 'Folding Travel Umbrella', 'Windproof Travel Umbrella'],
    'Golf Umbrellas': ['Large Golf Umbrella', 'Double Canopy Golf Umbrella', 'Wind Resistant Golf Umbrella', 'UV Protection Golf Umbrella', 'Heavy Duty Golf Umbrella'],
    'Fashion Umbrellas': ['Floral Fashion Umbrella', 'Transparent Fashion Umbrella', 'Patterned Fashion Umbrella', 'Lace Fashion Umbrella', 'Colorful Fashion Umbrella']
}

product_descriptions = {
    'Rain Umbrellas': ['Perfect for rainy days', 'Classic design', 'Windproof and durable', 'Extra large for more coverage', 'Automatic opening mechanism'],
    'Sun Umbrellas': ['Ideal for the beach', 'Great for patios', 'Portable and easy to carry', 'Blocks harmful UV rays', 'Perfect for gardens'],
    'Travel Umbrellas': ['Compact and easy to pack', 'Automatic open and close', 'Lightweight for easy travel', 'Folds up small', 'Windproof design'],
    'Golf Umbrellas': ['Large enough to cover you and your gear', 'Double canopy for extra strength', 'Resists wind gusts', 'Protects from the sun', 'Built to last'],
    'Fashion Umbrellas': ['Stylish floral design', 'Transparent for a unique look', 'Fun patterns', 'Elegant lace design', 'Bright and colorful']
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
