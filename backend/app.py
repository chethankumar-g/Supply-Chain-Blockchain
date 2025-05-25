from flask import Flask
from flask_cors import CORS
from routes import api_routes

app = Flask(__name__)
CORS(app)

app.register_blueprint(api_routes)

@app.route('/')
def home():
    return "Welcome to the Blockchain Supply Chain Management System"

if __name__ == '__main__':
    app.run(debug=True)