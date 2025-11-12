from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import os
import threading
import signal
import sys
from concurrent.futures import ThreadPoolExecutor, TimeoutError
import time

app = Flask(__name__)
CORS(app)

# Global variables
AI_AVAILABLE = False
ai_chatbot = None
executor = ThreadPoolExecutor(max_workers=1)

# Import your AI chatbot
try:
    from ai_chatbot import get_ai_response, initialize_ai
    AI_AVAILABLE = True
    print("AI modules imported successfully")
except ImportError as e:
    print(f"AI modules not available: {e}")
    AI_AVAILABLE = False
    
    def get_ai_response(message, language='ms'):
        return "AI service temporarily unavailable. Please try again later."
    
    def initialize_ai():
        pass

def init_ai_background():
    """Initialize AI in background"""
    global ai_chatbot, AI_AVAILABLE
    try:
        print("Starting AI initialization...")
        initialize_ai()
        AI_AVAILABLE = True
        print("AI initialization completed successfully")
    except Exception as e:
        print(f"AI initialization failed: {e}")
        AI_AVAILABLE = False

# Start AI initialization
if AI_AVAILABLE:
    print("Starting AI initialization in background...")
    threading.Thread(target=init_ai_background, daemon=True).start()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        message = data.get('message', '')
        language = data.get('language', 'ms')
        
        print(f"Received message: {message[:50]}...")
        
        if not message.strip():
            return jsonify({'answer': 'Please ask a question.' if language == 'en' else 'Sila tanya soalan.'})
        
        if not AI_AVAILABLE:
            fallback = "AI service is starting up. Please wait a moment and try again." if language == 'en' else "Perkhidmatan AI sedang bermula. Sila tunggu sebentar dan cuba lagi."
            return jsonify({'answer': fallback})
        
        # Use ThreadPoolExecutor with timeout to prevent hanging
        try:
            future = executor.submit(get_ai_response, message, language)
            response = future.result(timeout=15)  # 15 second timeout
            
            print(f"AI Response generated: {response[:50]}...")
            return jsonify({'answer': response})
            
        except TimeoutError:
            print("AI response timed out")
            timeout_msg = "Response took too long. Please try a simpler question." if language == 'en' else "Respons mengambil masa terlalu lama. Sila cuba soalan yang lebih mudah."
            return jsonify({'answer': timeout_msg})
        except Exception as e:
            print(f"AI processing error: {e}")
            error_msg = "I'm having trouble processing your question. Please try again." if language == 'en' else "Saya menghadapi masalah memproses soalan anda. Sila cuba lagi."
            return jsonify({'answer': error_msg})
    
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        return jsonify({'error': 'Internal server error. Please try again.'}), 500

@app.route('/api/status')
def status():
    return jsonify({
        'ai_available': AI_AVAILABLE,
        'status': 'ready' if AI_AVAILABLE else 'initializing'
    })

def signal_handler(sig, frame):
    print('Shutting down gracefully...')
    executor.shutdown(wait=False)
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)

if __name__ == '__main__':
    print("Starting Flask application...")
    app.run(debug=True, host='0.0.0.0', port=5000, threaded=True)