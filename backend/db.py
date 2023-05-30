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

        # results = await myCollection.insert_one(user_info)
        # print('result %s' % repr(results.inserted_id))
        await myCollection.insert_one(user_info)
        print("Successfully added to the database!")
        
    except Exception as e:
        print(e)

# asyncio.run(write_list(
#     {
#         "id": 123444,
#         "name": "Dien_Tran",
#         "age": 23,
#         "height": "5'5",
#         "weight": 150,
#         "lifts": []
#     }
# ))
