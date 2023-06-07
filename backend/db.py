import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi
from pymongo.errors import PyMongoError

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

        result = await myCollection.insert_one(user_info)
        if result.acknowledged:
            print("Successfully created new List!")
            return True
        else:
            print("Error, not added to database!")

    except PyMongoError as error:
        print(f"An error has occured: {error}")
    # finally:
    #     client.close()

# asyncio.run(write_list(
#     {
#         "id": 1245558,
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

        result = await myCollection.update_one(list_id, update)
        if result.matched_count == 0:
            print("No document with that ID exists!")
        else:
            print("Successfully added that to your list!")

    except PyMongoError as error:
        print(f"An error has occured: {error}")

# asyncio.run(add(
#     {"id" : "3329ba15-8a9f-42c3-857e-e4bfcee662b4"},
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

        # await myCollection.update_one(list_id, update)
        # print("Successfully made changes to the list!")

        result = await myCollection.update_one(list_id, update)
        if result.matched_count == 0:
            print("No document with that ID exists!")
        else:
            print("Successfully made changes to that list!")

    except PyMongoError as error:
        print(f"An error has occured: {error}")

# asyncio.run(update_list(
#     {"id": "3329ba15-8a9f-42c3-857e-e4bfcee662b4"},
#     {
#         "name": "Debugg!",
#         "age": "100",
#         "height": "6'9",
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

        # await myCollection.delete_one(list_id)
        # print("Successfully deleted that List from the database!")

        result = await myCollection.delete_one(list_id)
        if result.deleted_count == 0:
            print("Cannot delete - that ID does not exist!")
        else:
            print("Successfully delete that List!")

    except PyMongoError as error:
        print(f"An error has occured: {error}")

# asyncio.run(delete_list(
#     {
#     "id": "c143af2e-e26c-4bb4-aeef-8d833ec962c8"
#     }
# ))

# method for find a list
async def read_list(objID):
    try:
        myDB = client["BuffDB"]
        myCollection = myDB["PR_Lists"]

        list_id = {
            "id": objID["id"]
        }

        cursor = myCollection.find(list_id)
        documents = await cursor.to_list(length=None)

        if len(documents) == 0:
            print("No List with that ID exists!")
        else:
            for document in documents:
                print(f"Results:\n{document}")
        
    except PyMongoError as error:
        print(f"An error has occured: {error}")

# asyncio.run(read_list(
#     {
#         "id": "5acee403-a113-4802-9260-b74a142b8fd5"
#     }
# ))