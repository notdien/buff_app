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

# asyncio.run(ping())

# closes the client
async def close_client():
    client.close()

# writing a new list and adding it to mongoDB
async def write_list(obj):
    try:
        myDB = client["BuffDB"]
        myCollection = myDB["PR_Lists"]

        user_info = {
            "id": obj["id"],
            "name": obj["name"],
            "age": obj["age"],
            "height": obj["height"],
            "weight": obj["weight"],
            "lifts": obj["lifts"]
        }

        await myCollection.insert_one(user_info)
        print("Successfully added to the database!")
        
    except Exception as e:
        print(e)

# asyncio.run(write_list(
#     {
#         "id": 123444,
#         "name": "MongoPING",
#         "age": 23,
#         "height": "5'5",
#         "weight": 150,
#         "lifts": []
#     }
# ))

# method for adding to a list in the database
# async def add(objID, obj):
#     try:

#     except:

# method for deleting from the database
async def delete_list(objID):
    try:
        myDB = client["BuffDB"]
        mycollection = myDB["PR_Lists"]

        deletion = {
            "id": objID["id"]
        }

        await mycollection.delete_one(deletion)
        print("Successfully deleted that List from the database!")
    except Exception as e:
        print(e)

asyncio.run(delete_list(
    {
    "id": "65d80ef4-5baa-4777-b482-e805e0bb7bf9"
    }
))
