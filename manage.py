#!/usr/bin/env python
"""Startup script for the Flask application."""
import os
from app import app

if __name__ == '__main__':
    # Get port from environment variable (Render uses this)
    port = int(os.environ.get('PORT', 5000))
    
    # Run the Flask app
    app.run(debug=False, host='0.0.0.0', port=port)
