from flask import Flask, request, send_file
from flask_cors import CORS
from werkzeug.utils import secure_filename
from utils import markdown_to_pdf
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = 'uploads'

# Ensure the uploads folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/convert', methods=['POST'])
def convert():
    markdown_text = request.form.get('markdown')
    uploaded_file = request.files.get('file')

    if not markdown_text and not uploaded_file:
        return "No Markdown text or file provided", 400

    try:
        if markdown_text:
            markdown_to_pdf(markdown_text, 'output.pdf')
        elif uploaded_file:          
            filename = secure_filename(uploaded_file.filename)
            if not filename.endswith('.md'):
                return "Invalid file type. Please upload a .md file.", 400

            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            uploaded_file.save(filepath)


            with open(filepath, 'r', encoding='utf-8') as file:
                markdown_content = file.read()

            markdown_to_pdf(markdown_content, 'output.pdf')

        return send_file('output.pdf', as_attachment=True)

    except Exception as e:
        return f"Error: {e}", 500

if __name__ == '__main__':
    app.run(debug=True)
