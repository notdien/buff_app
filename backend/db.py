import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi

uri = 'mongodb+srv://dienttran7:xFjosyGy8GYh3kBO@cluster0.7pzlqnf.mongodb.net/'
client = AsyncIOMotorClient(uri, server_api = ServerApi('1'))

# attempting to establish a connection to mongodb
async def ping():
    try:
        client.admin.command('ping')
        print("Pinged your deployment, You successfully connected to MongoDB!")
    except Exception as e:
        print(e)

asyncio.run(ping())