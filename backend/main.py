# main python app
# from flask import Flask, request, render_template
from quart import Quart, request, jsonify, render_template
import json
import uuid
import asyncio

from db import write_list, add_to_list, update_list, delete_list, read_list


# app = Flask(__name__, template_folder='../frontend/templates')
app = Quart(__name__, template_folder='../frontend/templates')


@app.route('/create-list', methods=['POST'])
async def create_list():
    if request.method == "POST":
        data = await request.get_json()

        # generates a unique id
        id = str(uuid.uuid4())
        name = data.get('name')
        age = data.get('age')
        gender = data.get('gender')
        weight = data.get('weight')
        height = data.get('height')
        lifts = []

        if name and age and gender and height and weight:
            response_data = {
                'id': id,
                'name': name,
                'age': int(age),
                'gender': gender,
                'weight': int(weight),
                'height': height,
                'lifts': lifts
            }
            # response = json.dumps(response_data)
            # response = "Successfully created that List!\nHere is your info: \n" + json.dumps(response_data)
            await write_list(response_data)
            # return response, 200
            return jsonify({
                'message': 'Successfully created new list!',
                'data': response_data
            }), 200
        else:
            return "Invalid data. Please provide all the required data fields!", 400

    return "This route only accepts POST requests"


@app.route('/list/<string:id>', methods=['POST'])
async def add(id):
    if request.method == "POST":
        data = await request.get_json()

        lift = data.get('lift')
        pr = data.get('pr')
        date = data.get('date')

        if lift and pr and date:
            response_data = {
                'lift': lift,
                'pr': int(pr),
                'date': date
            }
            await add_to_list(id, response_data)
            return jsonify({
                'message': f'Successfully added to list: {id}',
                'data': response_data
            }), 200
        else:
            return "Invalid data. Please provide all the required data fields!", 400

    return "This route only accepts POST requests"


@app.route('/list/<string:id>', methods=['PUT'])
async def changes(id):
    if request.method == "PUT":
        data = await request.get_json()

        name = data.get('name')
        age = data.get('age')
        gender = data.get('gender')
        height = data.get('height')
        weight = data.get('weight')

        if name and age and gender and height and weight:
            response_data = {
                'name': name,
                'age': int(age),
                'gender': gender,
                'height': height,
                'weight': int(weight)
            }
            await update_list(id, response_data)
            return jsonify({
                'message': f"Made changes to: {id}",
                'changes': response_data
            }), 200
        else:
            return "Could not make new changes...", 400
        
    return "This route only accepts PUT requests"




@app.route('/list/<string:id>', methods=['DELETE'])
async def delete(id):
    if request.method == "DELETE":
        result = await delete_list(id)
        return jsonify(result), 200
    else:
        return "Unsuccessful in deleting that list :(", 400


@app.route('/list/<string:id>', methods=['GET'])
async def read(id):
    if request.method == "GET":
        result = await read_list(id)
        # return jsonify(result), 200
        return result, 200
    else:
        return "Error reading list...", 400


if __name__ == '__main__':
    app.run(debug=True)