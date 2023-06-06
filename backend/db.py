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
#         "name": "MongoPING2",
#         "age": 23,
#         "height": "5'5",
#         "weight": 150,
#         "lifts": []
#     }
# ))

# method for adding to a list in the database
async def add(objID, obj):
    try:
        myDB = client["BuffDB"]
        myCollection = myDB["PR_Lists"]

        list_id = {
            "id": objID["id"]
        }

        pr_list = {
            "lift": obj["lift"],
            "pr": obj["pr"],
            "date": obj["date"]
        }

        update = {"$push": {"lifts" : pr_list}}

        await myCollection.update_one(list_id, update)
        print("Sucessfully added that to your list!")

    except Exception as e:
        print(e)

# asyncio.run(add(
#     {"id" : "5acee403-a113-4802-9260-b74a142b8fd5"},
#     {
#         "lift": "bench",
#         "pr": "205",
#         "date": "5/29/23"
#     }
# ))

# method for updating user information if needed
async def update_list(objID, obj):
    try:
        myDB = client["BuffDB"]
        myCollection = myDB["PR_Lists"]

        list_id = {
            "id" : objID["id"]
        }

        updated_list = {
            "name": obj["name"],
            "age": obj["age"],
            "height": obj["height"],
            "weight": obj["weight"],
        }

        update = {"$set": updated_list}

        await myCollection.update_one(list_id, update)
        print("Successfully made changes to the list!")

    except Exception as e:
        print(e)

# asyncio.run(update_list(
#     {"id": "31f123f2-5906-4fa6-ad01-fc2c3aa1a846"},
#     {
#         "name": "MONGODB_testing",
#         "age": "69",
#         "height": "6'1",
#         "weight": "210"
#     }
# ))
        
# method for deleting from the database
async def delete_list(objID):
    try:
        myDB = client["BuffDB"]
        myCollection = myDB["PR_Lists"]

        list_id = {
            "id": objID["id"]
        }

        await myCollection.delete_one(list_id)
        print("Successfully deleted that List from the database!")
    except Exception as e:
        print(e)

# asyncio.run(delete_list(
#     {
#     "id": "65d80ef4-5baa-4777-b482-e805e0bb7bf9"
#     }
# ))

async def read_list(objID):
    try:
        myDB = client["BuffDB"]
        myCollection = myDB["PR_Lists"]

        list_id = {
            "id": objID["id"]
        }
        
    except Exception as e:
        print(e)