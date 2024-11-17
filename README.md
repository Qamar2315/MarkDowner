# MarkDowner

A simple and efficient web application for converting Markdown to PDF.

## Features

- **Clean and intuitive interface** for easy navigation.
- **Real-time Markdown preview** (optional, planned for future updates).
- **Server-side PDF generation** powered by **ReportLab** and **xhtml2pdf**.

## Tech Stack

- **Frontend**: React, Tailwind CSS  
- **Backend**: Python, Flask  
- **PDF Generation**: ReportLab, xhtml2pdf  

## Installation

### Clone the Repository
```bash
git clone https://github.com/yourusername/markdowner.git
```

### Install Frontend Dependencies
 ```bash
cd client
npm install
```

### Install Backend Dependencies
```bash
cd server  # Navigate to the backend directory
pip install -r requirements.txt
```

## Usage

### Start the Backend Server
```bash
python app.py  # Replace `app.py` with your backend's entry point if different
```

### Start the Frontend Development Server
```bash
npm start
```

### Open the App

Visit the application in your browser at http://localhost:3000.

## Contributing
### We welcome contributions!
If you'd like to suggest major changes, please open an issue first to discuss your ideas.
Pull requests for smaller improvements are also appreciated.