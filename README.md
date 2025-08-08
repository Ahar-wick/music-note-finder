# Music Note Finder

A web application that extracts vocal melody notes from songs and displays them on a virtual keyboard.

## Features

- Upload any audio file (MP3, WAV, etc.)
- Extract vocal melody notes
- Display notes on a virtual keyboard
- Simple interface for easy use

## Deployment to Render

1. Create a new account on [Render](https://render.com) if you don't have one
2. Click "New" and select "Web Service"
3. Connect your GitHub/GitLab repository or deploy manually
4. Render will automatically detect the `render.yaml` file and configure the service
5. The application will be deployed and available at the provided URL

## Local Development

1. Clone the repository
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Run the application: `flask run`
6. Open http://localhost:5000 in your browser