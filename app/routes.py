from flask import Blueprint, render_template, request, jsonify, send_from_directory
import os
from .utils import extract_vocal_notes
import uuid

main = Blueprint('main', __name__)

@main.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        
        if file:
            # Create uploads directory if it doesn't exist
            if not os.path.exists('uploads'):
                os.makedirs('uploads')
            
            # Save the file with a unique name
            filename = str(uuid.uuid4()) + os.path.splitext(file.filename)[1]
            filepath = os.path.join('uploads', filename)
            file.save(filepath)
            
            try:
                notes = extract_vocal_notes(filepath)
                return jsonify({'notes': notes})
            except Exception as e:
                return jsonify({'error': str(e)}), 500
            finally:
                # Clean up the uploaded file
                if os.path.exists(filepath):
                    os.remove(filepath)
    
    return render_template('index.html')

@main.route('/static/<path:filename>', endpoint='static_files')
def static_files(filename):
    return send_from_directory('static', filename)
