import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi
from pymongo.errors import PyMongoError
import json

uri = 'mongodb+srv://dienttran7:xFjosyGy8GYh3kBO@cluster0.7pzlqnf.mongodb.net/'
client = AsyncIOMotorClient(uri, server_api=ServerApi('1'))

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
            "Id": obj["Id"],
            "Name": obj["Name"],
            "Age": obj["Age"],
            "Gender": obj["Gender"],
            "Height": obj["Height"],
            "Weight": obj["Weight"],
            "Lifts": obj["Lifts"]
        }

        result = await myCollection.insert_one(user_info)
        if result.acknowledged:
            # print("Successfully created new List!")
            # return True
            return "Successfully created new List!"
        else:
            # print("Error, not added to database!")
            return "Error, not added to database!"

    except PyMongoError as error:
        print(f"An error has occured: {error}")
    # finally:
    #     client.close()

# asyncio.run(write_list(
#     {
#         "Id": "1245558",
#         "Name": "MongoPING2",
#         "Age": 23,
#         "Gender": "Male",
#         "Height": "5'5",
#         "Weight": 150,
#         "Lifts": []
#     }
# ))

# method for adding to a list in the database
async def add_to_list(objID, obj):
    try:
        myDB = client["BuffDB"]
        myCollection = myDB["PR_Lists"]

        pr_list = {
            "Lift": obj["Lift"],
            "Pr": obj["Pr"],
            "Date": obj["Date"]
        }

        update = {"$push": {"Lifts": pr_list}}

        result = await myCollection.update_one({"Id": objID}, update)
        if result.matched_count == 0:
            # print("No document with that ID exists!")
            return "No document with that ID exists!"
        else:
            # print("Successfully added that to your list!")
            return "Successfully added that to your list!"

    except PyMongoError as error:
        print(f"An error has occured: {error}")

# asyncio.run(add_to_list(
#     "79445436-897f-43a3-9d47-d222de2f70d9",
#     {
#         "Lift": "bench",
#         "Pr": 205,
#         "Date": "6/9/2023"
#     }
# ))

# method for updating user information if needed
async def update_list(objID, obj):
    try:
        myDB = client["BuffDB"]
        myCollection = myDB["PR_Lists"]

        updated_list = {
            "Name": obj["Name"],
            "Age": obj["Age"],
            "Gender": obj["Gender"],
            "Height": obj["Height"],
            "Weight": obj["Weight"],
        }

        update = {"$set": updated_list}

        # await myCollection.update_one(list_id, update)
        # print("Successfully made changes to the list!")

        result = await myCollection.update_one({"Id": objID}, update)
        if result.matched_count == 0:
            # print("No document with that ID exists!")
            return "No document with that ID exists!"
        else:
            # print("Successfully made changes to that list!")
            return "Successfully made changes to that list!"

    except PyMongoError as error:
        print(f"An error has occured: {error}")

# asyncio.run(update_list(
#     "1245558",
#     {
#         "Name": "Debugg!",
#         "Age": "100",
#         "Gender": "male",
#         "Height": "6'9",
#         "Weight": "210"
#     }
# ))

# method for deleting from the database
async def delete_list(objID):
    try:
        myDB = client["BuffDB"]
        myCollection = myDB["PR_Lists"]

        result = await myCollection.delete_one({"Id": objID})
        if result.deleted_count == 0:
            # print("Cannot delete - that ID does not exist!")
            return "Cannot delete - that ID does not exist!"
        else:
            # print("Successfully delete that List!")
            return "Successfully deleted that list!"

    except PyMongoError as error:
        print(f"An error has occured: {error}")

# asyncio.run(delete_list(
#     "1245558"
# ))

# method for find a list
async def read_list(objID):
    try:
        myDB = client["BuffDB"]
        myCollection = myDB["PR_Lists"]

        cursor = myCollection.find({"Id": objID})
        documents = await cursor.to_list(length=None)

        if len(documents) == 0:
            # print("No List with that ID exists!")
            return "No list with that ID exists!"
        else:
            for document in documents:
                result = (f"{document}")
                return result

    except PyMongoError as error:
        print(f"An error has occured: {error}")

# asyncio.run(read_list(
#     "ccc340bb-ac7a-44ec-bcd3-c390b3bd53a7"
# ))

# method for finding a user list with just the name to retrieve ID
async def get_ID(objName):
    try:
        myDB = client["BuffDB"]
        myCollection = myDB["PR_Lists"]

        cursor = myCollection.find({"Name": objName})
        documents = await cursor.to_list(length = None)

        if len(documents) == 0:
            return "No ID exists with that name :("
        else:
            results = []
            for document in documents:
                result = {"Name": document["Name"], "Id": document["Id"], "Age": document["Age"]}
                results.append(result)

        # print(results)
        return results
            
    except PyMongoError as error:
        print(f"An error has occured: {error}")

# asyncio.run(get_ID(
#     "User1"
# ))

# method for only getting PR's
async def get_lifts(objID):
    try:
        myDB = client["BuffDB"]
        myCollection = myDB["PR_Lists"]

        cursor = myCollection.find({"Id": objID})
        documents = await cursor.to_list(length = None)

        if len(documents) == 0:
            return "No lists exist with that ID :("
        else:
            results = []
            for document in documents:
                result = {"Name": document["Name"], "Id": document["Id"], "Lifts": document["Lifts"]}
                results.append(result)

        # print(results)
        return results
    except PyMongoError as error:
        print(f"An error has occured: {error}")

# asyncio.run(get_lifts(
#     "ccc340bb-ac7a-44ec-bcd3-c390b3bd53a7"
# ))