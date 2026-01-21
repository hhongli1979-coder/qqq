"""
Runpod Serverless Handler for MODA AI Studio
This handler serves the built React application on Runpod Serverless infrastructure.
"""

import runpod
import os
import json
from http.server import HTTPServer, SimpleHTTPRequestHandler
import threading
from pathlib import Path


class CustomHTTPRequestHandler(SimpleHTTPRequestHandler):
    """Custom HTTP handler to serve the React build"""
    
    def __init__(self, *args, **kwargs):
        # Set the directory to serve files from
        super().__init__(*args, directory='dist', **kwargs)
    
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_GET(self):
        # Serve index.html for SPA routes
        if self.path != '/' and not Path(f'dist{self.path}').exists():
            self.path = '/index.html'
        return super().do_GET()


def start_http_server(port=8000):
    """Start HTTP server in a background thread"""
    server = HTTPServer(('0.0.0.0', port), CustomHTTPRequestHandler)
    thread = threading.Thread(target=server.serve_forever)
    thread.daemon = True
    thread.start()
    print(f"HTTP server started on port {port}")
    return server


def handler(job):
    """
    Main handler function for Runpod Serverless
    
    Args:
        job: Job input containing the request parameters
        
    Returns:
        dict: Response containing the result
    """
    job_input = job.get('input', {})
    action = job_input.get('action', 'health')
    
    # Health check
    if action == 'health':
        return {
            "status": "healthy",
            "service": "MODA AI Studio",
            "version": "3.1",
            "message": "Service is running"
        }
    
    # Get app URL
    if action == 'get_url':
        port = int(os.getenv('HTTP_PORT', 8000))
        return {
            "status": "success",
            "url": f"http://0.0.0.0:{port}",
            "message": "Access the MODA AI Studio application"
        }
    
    # Process AI requests (proxy to frontend)
    if action == 'process':
        prompt = job_input.get('prompt', '')
        provider = job_input.get('provider', 'GEMINI')
        
        return {
            "status": "success",
            "action": "process",
            "prompt": prompt,
            "provider": provider,
            "message": "Request received. Access the web interface for full functionality."
        }
    
    # Default response
    return {
        "status": "unknown_action",
        "action": action,
        "message": "Supported actions: health, get_url, process"
    }


if __name__ == "__main__":
    # Start the HTTP server for the React app
    port = int(os.getenv('HTTP_PORT', 8000))
    
    # Check if dist directory exists
    if not Path('dist').exists():
        print("Warning: 'dist' directory not found. Please run 'npm run build' first.")
        print("Starting handler without HTTP server...")
    else:
        start_http_server(port)
        print(f"MODA AI Studio is being served at http://0.0.0.0:{port}")
    
    # Start Runpod serverless handler
    print("Starting Runpod Serverless handler...")
    runpod.serverless.start({"handler": handler})
