# AI Solutions Request Form

A web-based form for submitting AI solution requests that saves responses to an Excel file using a Python Flask backend.

## Project Structure

```
VibeCoding/
├── index.html          # Main HTML form
├── style.css          # CSS styling
├── script.js          # JavaScript for form handling
├── app.py             # Flask backend server
├── requirements.txt   # Python dependencies
├── responses.xlsx     # Excel file (created automatically)
└── README.md          # This file
```

## Features

- Beautiful, responsive web form with 7 specific business fields
- Client-side form validation with real-time feedback
- JSON data submission using Fetch API
- Flask backend with CORS support
- Automatic Excel file creation and data storage
- Error handling and user feedback
- Statistics endpoint to view submission counts

## Form Fields

1. **UserName** (Text input)
2. **Email** (Email input with validation)
3. **Employee ID** (Text input)
4. **Tower** (Dropdown: Tz, EDL, ESB, EDI, Corporate, Legacy Apps)
5. **Problem** (Dropdown: AI solution types including Incident Solution Recommendation, Knowledge chatbot, etc.)
6. **Business Benefit** (Textarea with character counter)
7. **Justification/UseCase** (Textarea with character counter)

## Quick Start Guide

### Step 1: Install Python Dependencies

1. Open PowerShell in the project directory (`C:\Users\2129487\VibeCoding`)
2. Install the required packages:

```powershell
pip install -r requirements.txt
```

### Step 2: Run the Flask Server

In PowerShell, run:
```powershell
python app.py
```

You should see output like:
```
==================================================
AI Solutions Request Flask Server
==================================================
Excel file: responses.xlsx
Server starting on http://localhost:5000
Available endpoints:
  GET  /          - Server status
  POST /submit    - Submit AI solution request
  GET  /stats     - View statistics
==================================================
```

### Step 3: Open the Form in Browser

1. Open your web browser
2. Navigate to the `index.html` file by either:
   - Double-clicking `index.html` in Windows Explorer, or
   - Opening your browser and pressing `Ctrl+O`, then selecting `index.html`

### Step 4: Test the Form

1. Fill out all 7 fields in the form
2. Click "Submit Request"
3. You should see a success message
4. Check that `responses.xlsx` has been created in your project directory

## API Endpoints

- `GET /` - Check server status
- `POST /submit` - Submit AI solution request (expects JSON)
- `GET /stats` - View submission statistics

## Excel File Structure
The `responses.xlsx` file contains columns for:
- Submission Time
- UserName
- Email
- Employee ID
- Tower
- Problem
- Business Benefit
- Justification/UseCase

## Technical Details

### Frontend (HTML/CSS/JavaScript)
- Responsive design that works on desktop and mobile
- Real-time form validation
- Visual feedback for form fields
- Character counters for textarea fields
- Loading states and error handling

### Backend (Python Flask)
- CORS enabled for cross-origin requests
- JSON data processing
- Excel file management with openpyxl
- Comprehensive error handling
- Data validation on server side with business rules

### Validation Rules
- All fields are required
- Email format validation
- Tower must be one of: Tz, EDL, ESB, EDI, Corporate, Legacy Apps
- Problem must be one of the predefined AI solution types
- Character limits on textarea fields (1000 characters each)

## Troubleshooting

### Common Issues:

1. **"Unable to connect to server" error**
   - Make sure the Flask server is running (`python app.py`)
   - Check that the server is accessible at `http://localhost:5000`

2. **Import errors when running Flask**
   - Install missing packages: `pip install flask openpyxl flask-cors`

3. **Form not submitting**
   - Check browser console for JavaScript errors
   - Ensure all required fields are filled

4. **Excel file not created**
   - Check file permissions in the directory
   - Ensure openpyxl is installed correctly

### Testing the Server Directly

You can test the server endpoints directly:

```powershell
# Check server status
curl http://localhost:5000/

# View statistics
curl http://localhost:5000/stats
```

## Customization

### Adding More Questions
1. Add new form fields in `index.html`
2. Update validation in `script.js`
3. Modify headers and data processing in `app.py`

### Styling Changes
- Modify `style.css` for appearance changes
- The CSS uses a gradient background and modern styling

### Backend Modifications
- Add new endpoints in `app.py`
- Modify Excel structure as needed
- Add additional validation rules

## Security Notes

This is a development setup. For production use:
- Add proper authentication
- Validate and sanitize all inputs
- Use HTTPS
- Implement rate limiting
- Add proper error logging
