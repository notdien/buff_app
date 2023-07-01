# main python app
# from flask import Flask, request, render_template
from quart import Quart, request, jsonify
import uuid

from quart_cors import cors

from db import write_list, add_to_list, update_list, delete_list, read_list, get_ID, get_lifts

# app = Flask(__name__, template_folder='../frontend/templates')
# app = Quart(__name__, template_folder='../frontend/templates')
app = Quart(__name__)
app = cors(app)


@app.route('/create-list', methods=['POST', 'GET'])
async def create_list():
    if request.method == "POST":
        data = await request.get_json()

        # generates a unique id
        Id = str(uuid.uuid4())
        Name = data.get('Name')
        Age = data.get('Age')
        Gender = data.get('Gender')
        Weight = data.get('Weight')
        Height = data.get('Height')
        Lifts = []

        if Name and Age and Gender and Height and Weight:
            response_data = {
                'Id': Id,
                'Name': Name,
                'Age': int(Age),
                'Gender': Gender,
                'Weight': int(Weight),
                'Height': Height,
                'Lifts': Lifts
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


@app.route('/list/<string:Id>', methods=['POST'])
async def add(Id):
    if request.method == "POST":
        data = await request.get_json()

        Lift = data.get('Lift')
        Pr = data.get('Pr')
        Date = data.get('Date')

        if Lift and Pr and Date:
            response_data = {
                'Lift': Lift,
                'Pr': int(Pr),
                'Date': Date
            }
            await add_to_list(Id, response_data)
            return jsonify({
                'message': f'Successfully added to list: {Id}',
                'data': response_data
            }), 200
        else:
            return "Invalid data. Please provide all the required data fields!", 400

    return "This route only accepts POST requests"


@app.route('/list/<string:Id>', methods=['PUT'])
async def changes(Id):
    if request.method == "PUT":
        data = await request.get_json()

        Name = data.get('Name')
        Age = data.get('Age')
        Gender = data.get('Gender')
        Height = data.get('Height')
        Weight = data.get('Weight')

        if Name and Age and Gender and Height and Weight:
            response_data = {
                'Name': Name,
                'Age': int(Age),
                'Gender': Gender,
                'Height': Height,
                'Weight': int(Weight)
            }
            await update_list(Id, response_data)
            return jsonify({
                'message': f"Made changes to: {Id}",
                'changes': response_data
            }), 200
        else:
            return "Could not make new changes...", 400
        
    return "This route only accepts PUT requests"


@app.route('/list/<string:Id>', methods=['DELETE'])
async def delete(Id):
    if request.method == "DELETE":
        result = await delete_list(Id)
        return jsonify(result), 200
    else:
        return "Unsuccessful in deleting that list :(", 400


@app.route('/list/<string:Id>', methods=['GET'])
async def read(Id):
    if request.method == "GET":
        result = await read_list(Id)
        # return jsonify(result), 200
        return result, 200
    else:
        return "Error reading list...", 400
    

@app.route('/list/id/<string:Name>', methods=['GET'])
async def find_ID(Name):
    if request.method == "GET":
        result = await get_ID(Name)
        return result, 200
    else:
        return "Error, no ID exists with that name :(", 400
    

@app.route('/list/lifts/<string:Id>', methods=['GET'])
async def lift_info(Id):
    if request.method == "GET":
        result = await get_lifts(Id)
        return result, 200
    else:
        return "Could not get lifts...", 400


if __name__ == '__main__':
    app.run(debug=True)