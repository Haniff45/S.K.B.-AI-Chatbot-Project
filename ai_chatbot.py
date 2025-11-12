import json
import random
from sentence_transformers import SentenceTransformer
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import pickle
import os

class HajjUmrahAI:
    def __init__(self):
        print("Initializing lightweight AI system...")
        self.setup_knowledge_base()
        self.setup_embeddings()
        print("AI system ready!")
    
    def setup_embeddings(self):
        """Use lightweight embedding model for similarity search"""
        try:
            # Use the smallest possible embedding model
            self.embedding_model = SentenceTransformer('all-MiniLM-L6-v2', device='cpu')
            
            # Pre-compute embeddings for knowledge base
            if os.path.exists('knowledge_embeddings.pkl'):
                with open('knowledge_embeddings.pkl', 'rb') as f:
                    self.knowledge_embeddings = pickle.load(f)
            else:
                self.compute_knowledge_embeddings()
        except:
            print("Embedding model not available, using keyword matching only")
            self.embedding_model = None
    
    def setup_knowledge_base(self):
        """Create comprehensive Q&A knowledge base"""
        self.knowledge_base = {
            # UMRAH KNOWLEDGE
            "umrah_pillars": {
                "ms": "Rukun Umrah ada 5: (1) Ihram dengan niat di Miqat, (2) Tawaf 7 kali pusingan mengelilingi Kaabah, (3) Saie 7 kali antara Safa dan Marwah, (4) Tahallul iaitu bercukur atau bergunting rambut, (5) Tertib mengikut urutan. Sumber: I'anah al-Talibin.",
                "en": "The 5 pillars of Umrah are: (1) Ihram with intention at Miqat, (2) Tawaf 7 circuits around the Kaaba, (3) Sa'i 7 times between Safa and Marwah, (4) Tahallul by shaving or cutting hair, (5) Following the sequence. Source: I'anah al-Talibin.",
                "keywords": ["rukun", "pillar", "umrah", "tawaf", "saie", "sai", "ihram", "tahallul", "miqat"]
            },
            "ihram_prohibitions": {
                "ms": "Larangan semasa ihram: (1) Memakai wangian, (2) Memotong rambut/kuku, (3) Menutup kepala bagi lelaki, (4) Memakai pakaian berjahit bagi lelaki, (5) Berkahwin atau menikah, (6) Membunuh binatang. Jika melanggar wajib bayar dam. Sumber: JAKIM.",
                "en": "Ihram prohibitions: (1) Wearing perfume, (2) Cutting hair/nails, (3) Covering head for men, (4) Wearing sewn clothes for men, (5) Getting married, (6) Killing animals. Violations require dam penalty. Source: JAKIM.",
                "keywords": ["larangan", "prohibition", "ihram", "haram", "forbidden", "dam", "penalty", "perfume", "wangi"]
            },
            "women_ihram": {
                "ms": "Wanita dalam ihram: Boleh pakai pakaian biasa yang menutup aurat. TIDAK boleh pakai niqab atau sarung tangan. Boleh tutup muka dengan kain biasa jika perlu. Semasa haid tidak boleh tawaf tetapi boleh saie. Sumber: Fatwa Wilayah Persekutuan.",
                "en": "Women in ihram: Can wear normal clothes covering awrah. CANNOT wear niqab or gloves. Can cover face with regular cloth if needed. During menstruation cannot perform tawaf but can do sa'i. Source: Federal Territory Fatwa.",
                "keywords": ["women", "wanita", "perempuan", "ihram", "niqab", "glove", "sarung", "haid", "period", "menstruation"]
            },
            "hajj_pillars": {
                "ms": "Rukun Haji ada 6: (1) Ihram, (2) Wukuf di Arafah pada 9 Zulhijjah, (3) Tawaf Ifadah, (4) Saie, (5) Tahallul, (6) Tertib. Wukuf di Arafah adalah rukun TERPENTING - tanpanya haji tidak sah. Sumber: Fath al-Qarib.",
                "en": "The 6 pillars of Hajj: (1) Ihram, (2) Wuquf at Arafat on 9th Dhul Hijjah, (3) Tawaf Ifadah, (4) Sa'i, (5) Tahallul, (6) Sequence. Wuquf at Arafat is the MOST IMPORTANT - without it Hajj is invalid. Source: Fath al-Qarib.",
                "keywords": ["hajj", "haji", "rukun", "pillar", "arafah", "arafat", "wukuf", "tawaf", "ifadah"]
            },
            "miqat_locations": {
                "ms": "Miqat untuk Malaysia: Yalamlam atau Qarnul Manazil. Dari Jeddah: Wajib ke salah satu miqat atau bayar dam. Miqat lain: Dzul Hulaifah (Madinah), Juhfah (Syria), Dzat Irq (Iraq). Sumber: JAKIM.",
                "en": "Miqat for Malaysians: Yalamlam or Qarnul Manazil. From Jeddah: Must go to a miqat or pay dam. Other miqats: Dhul Hulaifah (Madinah), Juhfah (Syria), Dhat Irq (Iraq). Source: JAKIM.",
                "keywords": ["miqat", "yalamlam", "qarnul", "manazil", "jeddah", "location", "tempat", "where"]
            },
            "dam_penalty": {
                "ms": "Dam (denda) wajib jika: Tinggal wajib haji/umrah atau langgar larangan ihram. Jenis dam: Seekor kambing disembelih di Makkah. Boleh bayar melalui Tabung Haji. Jika tak mampu, ganti dengan puasa 10 hari. Sumber: I'anah al-Talibin.",
                "en": "Dam (penalty) required if: Missing obligatory acts or violating ihram prohibitions. Dam type: One goat slaughtered in Makkah. Can pay through Tabung Haji. If unable, replace with 10 days fasting. Source: I'anah al-Talibin.",
                "keywords": ["dam", "penalty", "denda", "fine", "goat", "kambing", "violation", "langgar"]
            },
            "tawaf_types": {
                "ms": "Jenis Tawaf: (1) Tawaf Qudum - sunat ketika sampai, (2) Tawaf Ifadah - rukun haji, (3) Tawaf Wada' - wajib sebelum pulang, (4) Tawaf Sunat - bila-bila masa. Setiap tawaf 7 kali pusingan. Sumber: Al-Majmu'.",
                "en": "Types of Tawaf: (1) Tawaf Qudum - sunnah upon arrival, (2) Tawaf Ifadah - hajj pillar, (3) Tawaf Wada' - obligatory before leaving, (4) Voluntary Tawaf - anytime. Each tawaf is 7 circuits. Source: Al-Majmu'.",
                "keywords": ["tawaf", "types", "jenis", "qudum", "ifadah", "wada", "farewell", "circuits", "pusingan"]
            },
            "children_hajj": {
                "ms": "Kanak-kanak boleh haji/umrah. Baligh semasa ihram: Wajib teruskan & dikira haji wajib. Belum baligh: Dikira haji sunat, perlu haji lagi bila dewasa. Wali buat niat untuk anak kecil. Sumber: Fatwa Kebangsaan.",
                "en": "Children can perform hajj/umrah. Reach puberty during ihram: Must continue & counts as obligatory hajj. Not yet puberty: Counts as voluntary, must perform again when adult. Guardian makes intention for small children. Source: National Fatwa.",
                "keywords": ["children", "kanak", "budak", "child", "kid", "baligh", "puberty", "guardian", "wali"]
            },
            "saie_method": {
                "ms": "Cara Saie: Mulai di Safa, berakhir di Marwah = 1 kali. Ulang hingga 7 kali (berakhir di Marwah). Lelaki berlari kecil antara tiang hijau. Wanita berjalan biasa sahaja. Boleh berehat jika penat. Sumber: Mughni al-Muhtaj.",
                "en": "Sa'i method: Start at Safa, end at Marwah = 1 time. Repeat until 7 times (ending at Marwah). Men jog between green pillars. Women walk normally throughout. Can rest if tired. Source: Mughni al-Muhtaj.",
                "keywords": ["saie", "sai", "safa", "marwah", "method", "cara", "how", "green", "hijau"]
            }
        }
        
        # Quick responses for common questions
        self.quick_responses = {
            "greetings": {
                "ms": "Waalaikumsalam! Saya sedia membantu anda dengan panduan Umrah dan Haji. Apa yang ingin anda tanyakan?",
                "en": "Waalaikumsalam! I'm ready to help you with Umrah and Hajj guidance. What would you like to know?"
            },
            "thanks": {
                "ms": "Sama-sama! Semoga ibadah anda diterima Allah. Ada lagi soalan?",
                "en": "You're welcome! May Allah accept your worship. Any other questions?"
            }
        }
    
    def compute_knowledge_embeddings(self):
        """Pre-compute embeddings for all knowledge base entries"""
        if self.embedding_model:
            texts = []
            for key, value in self.knowledge_base.items():
                texts.append(' '.join(value.get('keywords', [])) + ' ' + value['ms'] + ' ' + value['en'])
            
            self.knowledge_embeddings = self.embedding_model.encode(texts)
            
            # Save for future use
            with open('knowledge_embeddings.pkl', 'wb') as f:
                pickle.dump(self.knowledge_embeddings, f)
    
    def find_best_match(self, question, language='ms'):
        """Find the best matching knowledge using embeddings or keywords"""
        question_lower = question.lower()
        
        # Check for greetings
        if any(greeting in question_lower for greeting in ['assalam', 'salam', 'hello', 'hi', 'hai']):
            return self.quick_responses['greetings'][language]
        
        # Check for thanks
        if any(thanks in question_lower for thanks in ['terima kasih', 'thank', 'syukran', 'jazak']):
            return self.quick_responses['thanks'][language]
        
        best_match = None
        best_score = 0
        
        # Try embedding similarity if available
        if self.embedding_model and hasattr(self, 'knowledge_embeddings'):
            try:
                question_embedding = self.embedding_model.encode([question])
                similarities = cosine_similarity(question_embedding, self.knowledge_embeddings)[0]
                best_idx = np.argmax(similarities)
                
                if similarities[best_idx] > 0.3:  # Threshold for relevance
                    best_match = list(self.knowledge_base.values())[best_idx]
                    best_score = similarities[best_idx]
            except:
                pass
        
        # Fallback to keyword matching
        if not best_match or best_score < 0.5:
            for key, entry in self.knowledge_base.items():
                keywords = entry.get('keywords', [])
                match_count = sum(1 for keyword in keywords if keyword in question_lower)
                
                if match_count > 0:
                    score = match_count / len(keywords)
                    if score > best_score:
                        best_score = score
                        best_match = entry
        
        if best_match:
            return best_match[language]
        
        # Default response if no match
        if language == 'ms':
            return "Maaf, saya tidak pasti tentang soalan itu. Cuba tanya tentang: rukun umrah, rukun haji, larangan ihram, cara tawaf, cara saie, miqat, atau dam."
        else:
            return "Sorry, I'm not sure about that question. Try asking about: umrah pillars, hajj pillars, ihram prohibitions, tawaf method, sa'i method, miqat, or dam penalties."
    
    def get_ai_response(self, user_question, language='ms'):
        """Get response using lightweight matching"""
        try:
            response = self.find_best_match(user_question, language)
            return response
        except Exception as e:
            print(f"Error: {e}")
            if language == 'ms':
                return "Maaf, saya menghadapi masalah teknikal. Sila cuba soalan yang lebih mudah."
            else:
                return "Sorry, I'm experiencing technical difficulties. Please try a simpler question."

# Global instance
ai_chatbot = None

def initialize_ai():
    global ai_chatbot
    if ai_chatbot is None:
        ai_chatbot = HajjUmrahAI()
    return ai_chatbot

def get_ai_response(question, language='ms'):
    try:
        ai = initialize_ai()
        return ai.get_ai_response(question, language)
    except Exception as e:
        return f"Error: {str(e)}"