from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

uri = 'mongodb+srv://dienttran7:xFjosyGy8GYh3kBO@cluster0.7pzlqnf.mongodb.net/'
client = MongoClient(uri)

# attempting to establish a connection to mongodb
def ping():
    try:
        client.admin.command('ismaster')
        print("Connected to DB!")
    except:
        print("Server not available...")

# ping()