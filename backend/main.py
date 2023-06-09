# main python app
# from flask import Flask, request, render_template
from quart import Quart, request, jsonify, render_template
import json
import uuid
import asyncio

from db import write_list, add, update_list, delete_list, read_list


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
                'message': 'Successfully created that List!',
                'data': response_data
            }), 200
        else:
            return "Invalid data. Please provide all the required data fields!"

    return "This route only accepts POST requests"
    # return render_template('create_list.html')

# @app.route('/add.html')


@app.route('/list/<string:id>', methods=['POST'])
async def add(id):
    if request.method == "POST":
        data = await request.get_json()

        lifts = data.get('lifts')
        pr = data.get('pr')
        date = data.get('date')

        if lifts and pr and date:
            response_data = {
                'lifts': lifts,
                'pr': int(pr),
                'date': date
            }
            await add(id, response_data)
            return jsonify({
                'message': f'Successfully added to List: + {id}',
                'data': response_data
            }), 200
        else:
            return "Invalid data. Please provide all the required data fields!"

    return "This route only accepts POST requests"
    # return render_template('add.html')


@app.route('/list/<string:id>', methods=['DELETE'])
async def delete(id):
    if request.method == "DELETE":
        await delete_list(id)
        return jsonify({
            'message': f'Successfully deleted List id: {id}'
        }), 200
    else:
        return "Unsuccessful in deleting that list :("


@app.route('/list/<string:id>', methods='[GET]')


if __name__ == '__main__':
    app.run(debug=True)
