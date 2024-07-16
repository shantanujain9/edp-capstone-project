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


umberella_images = [
"https://images.thdstatic.com/productImages/b2320990-51c6-4413-b2ee-24990492497a/svn/best-choice-products-market-umbrellas-sky6696-64_1000.jpg",
"https://m.media-amazon.com/images/I/61xHuVq408L.jpg",
"https://m.media-amazon.com/images/I/61RWvE1VptL.jpg",
"https://images.thdstatic.com/productImages/9e3a621d-cbe2-438b-ae84-17a1dd6a0108/svn/best-choice-products-market-umbrellas-sky6698-64_1000.jpg",
"https://images.thdstatic.com/productImages/cb99f57c-b8b6-4d81-9905-2500ea128399/svn/best-choice-products-market-umbrellas-sky4491-64_1000.jpg",
"https://bluntumbrellas.com/cdn/shop/files/ProductCard_Template_Coupe_0002_Coupe_side_yellow.png?v=1689228181&width=1200",
"https://zpacks.com/cdn/shop/products/lotus-umbrella-4_2048x.jpg?v=1579618409",
"https://www.toynk.com/cdn/shop/products/DHC-15-282-CA_3c73b227-3a04-45a9-95d8-d24d7af065c6.jpg?v=1647662101",
"https://businessandpleasureco.com/cdn/shop/products/Business-And-Pleasure-Co-Premium-Umbrella-Antique-White-Gallery-Web-Res.jpg?v=1702599969&width=2048"
]


# Generate and insert 1000 dummy products
for _ in range(1000):
    category = random.choice(categories)
    product = {
        'name': random.choice(product_names[category]),
        'category': category,
        'price': round(random.uniform(10.0, 100.0), 2),
        'description': random.choice(product_descriptions[category]),
        'image': random.choice(umberella_images),
        'popularity': random.randint(0, 100),
        'durability': random.randint(0, 100),
    }
    products_collection.insert_one(product)

print("Database populated with dummy data")
