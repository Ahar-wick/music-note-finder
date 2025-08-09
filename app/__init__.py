from flask import Flask
from .routes import main

def create_app():
    app = Flask(__name__, static_folder='static')
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB upload limit
    app.config['UPLOAD_FOLDER'] = 'uploads'
    app.register_blueprint(main)
    return app
