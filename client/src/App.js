import React, { useState } from 'react';
import axios from 'axios';

export default function MarkDowner() {
    const [markdown, setMarkdown] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const formData = new FormData();
        if (markdown) formData.append('markdown', markdown);
        if (file) formData.append('file', file);

        try {
            const response = await axios.post(`${BASE_URL}/convert`, formData, {
                responseType: 'blob',
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'output.pdf');
            document.body.appendChild(link);
            link.click();
        } catch (err) {
            console.error('Error converting to PDF:', err);
            setError('Failed to convert Markdown to PDF. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-200 to-pink-100 flex items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg max-w-lg w-full p-6">
                <h1 className="text-3xl font-bold text-center text-purple-600 mb-4">MarkDowner</h1>
                <p className="text-gray-600 text-center mb-6">
                    Convert your Markdown text or files to PDF effortlessly.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                        className="w-full h-32 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        placeholder="Enter Markdown text here..."
                    ></textarea>

                    <div className="flex items-center space-x-2">
                        <label
                            htmlFor="file"
                            className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded cursor-pointer"
                        >
                            Upload .md File
                        </label>
                        <input
                            id="file"
                            type="file"
                            accept=".md"
                            className="hidden"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        {file && <span className="text-sm text-gray-600">{file.name}</span>}
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className={`w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={loading}
                    >
                        {loading ? 'Converting...' : 'Convert to PDF'}
                    </button>
                </form>
            </div>
        </div>
    );
}
