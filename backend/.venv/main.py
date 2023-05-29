# main python app
from flask import Flask, request
from flask import render_template
import json
import uuid


app = Flask(__name__, template_folder='../../frontend/templates')
# app = Flask(__name__)

# routing to a homepage
# @app.route('/')
# def home():
#     return render_template('index.html')

# creates a new list for a user
@app.route('/')
def create():
    return render_template('create_list.html')

@app.route('/create-list', methods=['POST'])
def create_list():
    if request.method == "POST":
        data = request.get_json()

        # generates a unique id
        id = str(uuid.uuid4())
        name = data.get('name')
        age = data.get('age')
        height = data.get('height')
        weight = data.get('weight')
        lifts = []

        if name and age and height and weight:
            response_data = {
                'id': id,
                'name': name,
                'age': age,
                'height': height,
                'weight': weight,
                'lifts': lifts
            }
            response = json.dumps(response_data)
            return response
        else:
            return "Invalid data. Please provide all the required data fields!"
        
    return "This route only accepts POST requests"

if __name__ == '__main__':
    app.run(debug=True)
