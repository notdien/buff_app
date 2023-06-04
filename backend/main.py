# main python app
from flask import Flask, request
from flask import render_template
import json
import uuid
import asyncio

from db import write_list, close_client


app = Flask(__name__, template_folder='../frontend/templates')

# routing to a homepage
@app.route('/index.html')
def home():
    return render_template('index.html')

# creates a new list for a user
@app.route('/create_list.html')
@app.route('/create-list', methods=['POST'])
async def create_list():
    if request.method == "POST":
        data = request.get_json()

        # generates a unique id
        id = str(uuid.uuid4())
        name = data.get('name')
        age = data.get('age')
        weight = data.get('weight')
        height = data.get('height')
        lifts = []

        if name and age and height and weight:
            response_data = {
                'id': id,
                'name': name,
                'age': age,
                'weight': weight,
                'height': height,
                'lifts': lifts
            }
            response = json.dumps(response_data)
            await write_list(response_data)
            print("Successfully created that list!")
            return response
        else:
            return "Invalid data. Please provide all the required data fields!"
        
    # return "This route only accepts POST requests"
    return render_template('create_list.html')

@app.route('/add.html')
def add():
    return render_template('add.html')

@app.route('/update.html')
def update():
    return render_template('update.html')

@app.route('/delete.html')
def delete():
    return render_template('delete.html')

@app.route('/view.html')
def view():
    return render_template('view.html')

if __name__ == '__main__':
    app.run(debug=True)
