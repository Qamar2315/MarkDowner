from xhtml2pdf import pisa
import markdown2

def markdown_to_pdf(markdown_text, output_filename):
    html = markdown2.markdown(markdown_text, extras=['fenced-code-blocks', 'tables'])  # Include necessary extras

    # Wrap HTML with <style> for improved code block rendering
    styled_html = f"""
    <html>
    <head>
    <style>
    pre {{
        background-color: #f0f0f0; 
        padding: 10px;
        border-radius: 5px;
        font-family: monospace; 
        white-space: pre-wrap;
        overflow-x: auto;  /* Add horizontal scrolling for long lines */
    }}
    code {{
        font-family: monospace; 
    }}
    table {{
        width: 100%;
        border-collapse: collapse;
    }}
    th, td {{
        border: 1px solid black;
        padding: 8px;
        text-align: left;
    }}
    </style>
    </head>
    <body>
    {html}
    </body>
    </html>
    """

    pisa.CreatePDF(styled_html, dest=open(output_filename, "wb"))
