# AI Solutions Request Form - Render Deployment

## Deployment Instructions for Render.com

### Prerequisites
1. Create a GitHub repository with your project files
2. Sign up for a free account at [Render.com](https://render.com)

### Project Files for Deployment
Your project should contain these files:
- `app.py` - Flask backend server
- `index.html` - Main form HTML
- `style.css` - CSS styling
- `script.js` - JavaScript functionality
- `requirements.txt` - Python dependencies
- `Procfile` - Render deployment configuration
- `runtime.txt` - Python version specification
- `README_DEPLOY.md` - This deployment guide

### Step 1: Prepare Your GitHub Repository

1. **Initialize Git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit for AI Solutions Request Form"
   ```

2. **Create a new repository on GitHub** and push your code:
   ```bash
   git remote add origin https://github.com/yourusername/ai-solutions-form.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy on Render

1. **Log in to Render** and click "New +" then "Web Service"

2. **Connect your GitHub repository**:
   - Select "Connect a repository"
   - Choose your GitHub account
   - Select the repository containing your form

3. **Configure the deployment**:
   - **Name**: `ai-solutions-request-form` (or your preferred name)
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python app.py`
   - **Plan**: Select "Free" for testing

4. **Environment Variables** (Optional):
   - `EXCEL_FILE_PATH`: `responses.xlsx` (default is fine)

5. **Click "Create Web Service"**

### Step 3: Access Your Deployed Application

Once deployment is complete:
- Your form will be available at: `https://your-app-name.onrender.com`
- The API endpoints will work at the same domain
- No need for separate frontend hosting - everything is served by Flask

### Important Notes for Production

#### File Persistence
- **⚠️ Important**: Render's free tier has ephemeral storage
- Excel files will be lost when the service restarts
- For production use, consider:
  - Upgrading to a paid plan with persistent storage
  - Using a database instead of Excel files
  - Integrating with cloud storage (Google Drive, AWS S3)

#### Performance Considerations
- Free tier services may sleep after 15 minutes of inactivity
- First request after sleeping may take 30+ seconds to respond
- Consider upgrading for production use

#### Security Enhancements for Production
- Add input sanitization and validation
- Implement rate limiting
- Add authentication if needed
- Use HTTPS (Render provides this automatically)

### Testing Your Deployment

1. **Test the main form**: Visit your Render URL
2. **Test form submission**: Fill out and submit the form
3. **Check server status**: Visit `https://your-app.onrender.com/health`
4. **View statistics**: Visit `https://your-app.onrender.com/stats`

### Troubleshooting

#### Common Issues:
1. **Build fails**: Check that all files are committed to GitHub
2. **App won't start**: Verify `Procfile` and `requirements.txt` are correct
3. **Form submission fails**: Check browser console for CORS errors

#### Logs and Debugging:
- View logs in the Render dashboard under "Logs"
- Monitor service health in the "Events" tab
- Check the "Settings" tab for configuration issues

### Alternative Database Solution (Recommended for Production)

For better data persistence, consider replacing Excel with a database:

```python
# Add to requirements.txt
flask-sqlalchemy==3.0.5

# Example database model (add to app.py)
from flask_sqlalchemy import SQLAlchemy

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///responses.db')
db = SQLAlchemy(app)

class Response(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    submission_time = db.Column(db.DateTime, default=datetime.utcnow)
    user_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    # ... add other fields
```

### Support

If you encounter issues:
1. Check Render's documentation: https://render.com/docs
2. Review the deployment logs in your Render dashboard
3. Ensure all required files are in your GitHub repository

Your AI Solutions Request Form is now ready for production use on Render! 🚀
