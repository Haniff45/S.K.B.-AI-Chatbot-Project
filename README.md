# Selangkah Ke Baitullah 🕋
### AI-Powered Hajj & Umrah Guidance Chatbot

A comprehensive web-based chatbot application providing authentic Islamic guidance for Umrah and Hajj pilgrimage, based on Shafi'i madhab and Malaysian Islamic authorities.

---

## 📋 Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Usage Guide](#usage-guide)
- [API Endpoints](#api-endpoints)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### Core Functionality
- **AI-Powered Chatbot**: Intelligent responses using sentence transformers and semantic similarity
- **Bilingual Support**: Full support for English and Malay (Bahasa Malaysia)
- **Knowledge Base**: Comprehensive Q&A covering:
  - Umrah & Hajj pillars and obligations
  - Ihram requirements and prohibitions
  - Women's specific guidance
  - Children's hajj/umrah rules
  - Dam (penalty) regulations
  - Miqat locations

### User Interface
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern Dark Theme**: Sleek gradient design with smooth animations
- **Multi-Section Navigation**:
  - Home (Chatbot Interface)
  - FAQ (15+ pre-answered questions)
  - Contact (Direct communication channels)
- **Real-time Typing Indicators**: Visual feedback during AI processing
- **Smooth Animations**: Enhanced UX with CSS transitions and effects

### Technical Features
- **Lightweight AI Model**: Uses `all-MiniLM-L6-v2` for efficient semantic search
- **Async Processing**: Non-blocking AI responses with timeout handling
- **Error Recovery**: Graceful fallbacks when AI is unavailable
- **CORS Support**: Ready for cross-origin requests
- **Background Initialization**: AI loads in background for faster startup

---

## 🛠 Technology Stack

### Backend
- **Flask**: Python web framework
- **Flask-CORS**: Cross-origin resource sharing
- **sentence-transformers**: Semantic similarity search
- **scikit-learn**: Cosine similarity calculations
- **numpy**: Numerical computations

### Frontend
- **Vanilla JavaScript**: No framework dependencies
- **Modern CSS3**: Gradients, animations, flexbox
- **Font Awesome 6.4.0**: Icon library

### AI/ML
- **SentenceTransformer Model**: `all-MiniLM-L6-v2`
- **Embedding Cache**: Pre-computed knowledge embeddings
- **Fallback System**: Keyword matching when embeddings unavailable

---

## 📁 Project Structure

```
selangkah-ke-baitullah/
│
├── app.py                      # Flask application & API routes
├── ai_chatbot.py              # AI chatbot logic & knowledge base
├── requirement.txt            # Python dependencies
│
├── templates/
│   └── index.html             # Main HTML template
│
├── static/
│   ├── script.js              # Frontend JavaScript logic
│   └── style.css              # Styling & animations
│
└── knowledge_embeddings.pkl   # (Generated) Cached embeddings
```

### File Descriptions

#### `app.py`
- Flask server initialization
- API endpoints (`/api/chat`, `/api/status`)
- CORS configuration
- Background AI initialization
- Timeout handling (15s per request)
- Graceful shutdown handling

#### `ai_chatbot.py`
- `HajjUmrahAI` class: Main AI logic
- Knowledge base with 9+ topics
- Semantic similarity search
- Keyword fallback matching
- Bilingual response system

#### `index.html`
- Responsive layout structure
- Sidebar navigation
- Chat interface
- FAQ section
- Contact form

#### `script.js`
- `IslamicGuidanceApp` class
- View switching logic
- Language toggle system
- Message handling
- API communication
- Contact form popup

#### `style.css`
- Dark theme design
- Gradient backgrounds
- Animation keyframes
- Responsive media queries
- Mobile-first approach

---

## 🚀 Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)
- 2GB RAM minimum
- Internet connection (first run only for model download)

### Step-by-Step Setup

1. **Clone/Download the Project**
```bash
cd selangkah-ke-baitullah
```

2. **Create Virtual Environment** (Recommended)
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

3. **Install Dependencies**
```bash
pip install -r requirement.txt
```

**Note**: First installation will download the `all-MiniLM-L6-v2` model (~90MB). This may take 2-5 minutes depending on your internet speed.

4. **Verify Installation**
```bash
python app.py
```

You should see:
```
Starting Flask application...
AI modules imported successfully
Starting AI initialization in background...
 * Running on http://0.0.0.0:5000
```

---

## ⚙️ Configuration

### Port Configuration
Edit `app.py` line 89:
```python
app.run(debug=True, host='0.0.0.0', port=5000, threaded=True)
```

### Timeout Settings
Edit `app.py` line 49:
```python
response = future.result(timeout=15)  # Change 15 to desired seconds
```

### AI Model Selection
Edit `ai_chatbot.py` line 19:
```python
self.embedding_model = SentenceTransformer('all-MiniLM-L6-v2', device='cpu')
```

Alternative models:
- `paraphrase-MiniLM-L3-v2` (faster, less accurate)
- `all-mpnet-base-v2` (slower, more accurate)

### Knowledge Base Expansion
Add new topics in `ai_chatbot.py`:
```python
self.knowledge_base = {
    "your_topic_key": {
        "ms": "Malay answer here",
        "en": "English answer here",
        "keywords": ["keyword1", "keyword2", "keyword3"]
    }
}
```

---

## 🏃 Running the Application

### Development Mode
```bash
python app.py
```

Access at: `http://localhost:5000`

### Production Mode
For production, use a WSGI server like Gunicorn:

```bash
# Install Gunicorn
pip install gunicorn

# Run with 4 workers
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Background Service (Linux)
Create systemd service `/etc/systemd/system/hajj-chatbot.service`:

```ini
[Unit]
Description=Hajj Umrah Chatbot
After=network.target

[Service]
User=your_username
WorkingDirectory=/path/to/selangkah-ke-baitullah
Environment="PATH=/path/to/venv/bin"
ExecStart=/path/to/venv/bin/gunicorn -w 4 -b 0.0.0.0:5000 app:app

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable hajj-chatbot
sudo systemctl start hajj-chatbot
```

---

## 📖 Usage Guide

### For End Users

#### 1. Language Selection
- Click the language toggle button in the sidebar
- Toggle between English (EN) and Malay (BM)
- All content updates instantly

#### 2. Asking Questions
- Navigate to Home section
- Type your question in the input box
- Press Enter or click the send button
- Wait for AI response (typically 1-3 seconds)

**Example Questions:**
- "What are the pillars of Umrah?"
- "Can women perform tawaf during menstruation?"
- "What is the dam penalty?"
- "Apakah rukun haji?"

#### 3. FAQ Section
- Click "F.A.Q." in navigation
- Click any question to expand answer
- Click again to collapse
- All answers include sources

#### 4. Contact Form
- Fill in name, email, and message
- Click "Send Message"
- Choose contact method:
  - Default email client
  - Gmail
  - Outlook
  - WhatsApp
- Message pre-fills with your details

### For Developers

#### Adding New Knowledge
1. Open `ai_chatbot.py`
2. Add entry to `self.knowledge_base`:
```python
"new_topic": {
    "ms": "Jawapan Melayu di sini",
    "en": "English answer here",
    "keywords": ["topic", "related", "words"]
}
```
3. Restart server
4. Delete `knowledge_embeddings.pkl` to regenerate

#### Modifying UI
- **Colors**: Edit CSS variables in `style.css`
- **Layout**: Modify HTML structure in `index.html`
- **Animations**: Adjust keyframes in `style.css`
- **Logic**: Update `IslamicGuidanceApp` class in `script.js`

---

## 🔌 API Endpoints

### POST `/api/chat`
Send a question to the chatbot.

**Request:**
```json
{
  "message": "What are the pillars of Umrah?",
  "language": "en"
}
```

**Response:**
```json
{
  "answer": "The 5 pillars of Umrah are: (1) Ihram with intention..."
}
```

**Status Codes:**
- `200`: Success
- `500`: Server error

### GET `/api/status`
Check if AI is ready.

**Response:**
```json
{
  "ai_available": true,
  "status": "ready"
}
```

---

## 🎨 Customization

### Changing Theme Colors

Edit `style.css`:
```css
/* Main backgrounds */
body { background: #212121; }
.sidebar { background: #171717; }
.chat-box { background: #2a2a2a; }

/* Accent colors */
.nav-btn.active { border-left: 4px solid #your-color; }
.submit-btn { background: linear-gradient(135deg, #color1, #color2); }
```

### Adding New Sections

1. **HTML** (`index.html`):
```html
<button class="nav-btn" data-view="newsection">
    <i class="fas fa-icon"></i>
    <span>New Section</span>
</button>

<div class="view" id="newsection-view">
    <div class="content-header">
        <h3>Your Content Here</h3>
    </div>
    <div class="content-body">
        <!-- Content -->
    </div>
</div>
```

2. **JavaScript** (`script.js`):
```javascript
// Add translations in constructor
this.translations = {
    en: { 'newsection-title': 'New Section' },
    ms: { 'newsection-title': 'Bahagian Baru' }
};
```

### Contact Information

Update in `index.html`:
```html
<p>your-email@example.com</p>
<p>+60 XX XXXX XXXX</p>
<p>Your Address Here</p>
```

And in `script.js`:
```javascript
const emailSubject = encodeURIComponent(`Inquiry from ${name}`);
const whatsappMessage = encodeURIComponent(`Hi, I'm ${name}...`);
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. AI Not Responding
**Symptom**: "AI service temporarily unavailable"

**Solutions:**
- Check if model downloaded: `~/.cache/torch/sentence_transformers/`
- Verify dependencies: `pip install -r requirement.txt --upgrade`
- Check console logs: `python app.py`
- Increase timeout in `app.py` line 49

#### 2. Module Import Errors
**Symptom**: `ImportError: No module named 'flask'`

**Solutions:**
```bash
# Reinstall dependencies
pip install -r requirement.txt

# Verify virtual environment is activated
which python  # Should show venv path
```

#### 3. Port Already in Use
**Symptom**: `Address already in use`

**Solutions:**
```bash
# Find process using port 5000
# Linux/Mac
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

#### 4. Slow First Response
**Symptom**: First query takes 30+ seconds

**Explanation**: Model is loading in background. This is normal.

**Solution**: Wait for console message:
```
AI initialization completed successfully
```

#### 5. CORS Errors (Browser Console)
**Symptom**: "Access-Control-Allow-Origin"

**Solution**: Ensure Flask-CORS is installed:
```bash
pip install flask-cors
```

#### 6. Mobile Layout Issues
**Symptom**: Sidebar not collapsing

**Solution**: Clear browser cache and hard reload (Ctrl+Shift+R)

### Debug Mode

Enable detailed logging in `app.py`:
```python
import logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
app.debug = True
```

---

## 🌐 Deployment

### Option 1: Heroku

1. Create `Procfile`:
```
web: gunicorn app:app
```

2. Create `runtime.txt`:
```
python-3.10.12
```

3. Deploy:
```bash
heroku create your-app-name
git push heroku main
```

### Option 2: DigitalOcean App Platform

1. Connect GitHub repository
2. Set build command: `pip install -r requirement.txt`
3. Set run command: `gunicorn -w 4 app:app`
4. Deploy

### Option 3: AWS EC2

```bash
# Install dependencies
sudo apt update
sudo apt install python3-pip python3-venv nginx

# Clone project
git clone <your-repo>
cd selangkah-ke-baitullah

# Setup
python3 -m venv venv
source venv/bin/activate
pip install -r requirement.txt gunicorn

# Configure Nginx
sudo nano /etc/nginx/sites-available/hajj-chatbot

# Start service
gunicorn -w 4 -b 127.0.0.1:5000 app:app
```

### Environment Variables

For sensitive data, use environment variables:

```python
# app.py
import os
SECRET_KEY = os.getenv('SECRET_KEY', 'default-secret')
```

```bash
export SECRET_KEY=your-secret-key
```

---

## 🤝 Contributing

### Adding Knowledge Entries

1. Fork the repository
2. Add entries to `ai_chatbot.py`
3. Test with both languages
4. Submit pull request with:
   - Source references
   - Test examples
   - Documentation updates

### Code Style

- Python: PEP 8
- JavaScript: Airbnb Style Guide
- CSS: BEM methodology

### Testing Checklist

- [ ] AI responses accurate in both languages
- [ ] Mobile responsive (320px - 1920px)
- [ ] FAQ expandable/collapsible
- [ ] Contact form submits correctly
- [ ] Language toggle updates all text
- [ ] No console errors
- [ ] Typing indicator appears
- [ ] Timeout handling works

---

## 📄 License

This project is provided as-is for educational and non-commercial use. 

**Islamic Content Sources:**
- I'anah al-Talibin
- Fath al-Qarib
- Al-Majmu' (Imam Nawawi)
- Mughni al-Muhtaj
- JAKIM (Jabatan Kemajuan Islam Malaysia)
- Fatwa Wilayah Persekutuan
- Malaysian National Fatwa Council

---

## 📞 Support

For technical issues or questions:

**Email**: rehlahinternational@gmail.com  
**Phone**: +60 10 868 1889  
**WhatsApp**: [Message Us](https://wa.me/60108681889)

**Address**:
```
Rehlah International Travel & Tours Sdn. Bhd.
No 17-2 Jalan 3/76D
Desa Pandan
55100, Kuala Lumpur, Malaysia
```

---

## 🙏 Acknowledgments

- **Tabung Haji Malaysia**: Hajj & Umrah guidelines
- **JAKIM**: Islamic rulings and references
- **Sentence Transformers**: AI model library
- **Flask Community**: Web framework support
- **Font Awesome**: Icon library

---

## 📝 Changelog

### Version 1.0.0 (Current)
- Initial release
- Bilingual support (EN/MS)
- 9 knowledge base topics
- FAQ section with 15 questions
- Responsive design
- Contact form with multiple channels
- AI-powered semantic search
- Keyword fallback system

---

## 🔮 Future Enhancements

- [ ] Voice input support
- [ ] PDF guide generation
- [ ] Prayer time integration
- [ ] Qibla direction finder
- [ ] Multi-language support (Arabic, Urdu, Indonesian)
- [ ] User accounts & history
- [ ] Admin dashboard for knowledge management
- [ ] Mobile app (React Native)
- [ ] Offline mode with cached responses

---

## ⚠️ Important Notes

1. **Model Download**: First run downloads ~90MB AI model
2. **Memory Usage**: Requires ~500MB RAM during operation
3. **Response Time**: First query may take 5-10 seconds (model loading)
4. **Browser Support**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
5. **Mobile Data**: Initial load ~2MB, subsequent visits ~200KB

---

**جزاكم الله خيرا** (May Allah reward you with goodness)

For the best experience, please ensure stable internet connection and modern web browser.

---

*Last Updated: November 2024*  
*Maintained by: Rehlah International Travel & Tours Sdn. Bhd.*
