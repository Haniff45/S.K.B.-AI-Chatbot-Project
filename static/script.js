// Islamic Guidance Chatbot - Enhanced Version
class IslamicGuidanceApp {
    constructor() {
        // State management
        this.state = {
            currentLanguage: 'ms',
            currentView: 'home',
            isTyping: false,
            messageHistory: []
        };
  
        // Language data
        this.translations = {
            en: {
                'chat-title': 'Umrah & Hajj Guidance',
                'faq-title': 'Frequently Asked Questions',
                'contact-title': 'Contact Us',
                'welcome': 'السلام عليكم! 👋<br>I\'m Selangkah Ke Baitullah, your guide for Umrah & Hajj.<br>How can I assist you today?',
                'input-placeholder': 'Ask about Umrah, Hajj, Ihram...',
                'typing': 'Typing...',
                'nav-home': 'Home',
                'nav-faq': 'F.A.Q.',
                'nav-contact': 'Contact',
                'faq-1-q': 'Can I wear a watch/sandals during ihram?',
                'faq-1-a': 'Ruling: Permissible (does not invalidate ihram)<br>Source: I\'anah al-Talibin, Chapter on Ihram',
                'faq-2-q': 'Must women wear white for ihram?',
                'faq-2-a': 'Ruling: Recommended (no specific color required, just cover awrah)<br>Source: JAKIM Guidelines (2023)',
                'faq-3-q': 'What if I forget to make intention at miqat?',
                'faq-3-a': 'Ruling: Must return to miqat or pay dam<br>Source: Fatwa Wilayah Persekutuan (2021)',
                'faq-4-q': 'What to do if unable to perform hajj due to illness?',
                'faq-4-a': 'Ruling: Must appoint a representative (e.g., stoning jamarat by proxy)<br>Source: Al-Majmu\', Volume 8',
                'faq-5-q': 'Is it necessary to touch Hajar Aswad every tawaf circuit?',
                'faq-5-a': 'Ruling: Recommended (if not crowded)<br>Source: Fath al-Qarib, Chapter on Tawaf',
                'faq-6-q': 'Must I re-enter ihram if umrah is disrupted?',
                'faq-6-a': '✓ No need, continue process after purification<br>Source: Mughni al-Muhtaj, Chapter on Umrah',
                'faq-7-q': 'What is the ruling on wearing perfume after ihram bath?',
                'faq-7-a': '✓ Recommended before intention (avoid on ihram clothing)<br>✗ Forbidden if applied after ihram<br>Source: Hadith of Aisha RA (Sahih Bukhari)',
                'faq-8-q': 'Can women wear gloves during ihram?',
                'faq-8-a': '✗ Forbidden (must pay dam)<br>✓ May cover hands with loose cloth<br>Source: Fatwa Wilayah Persekutuan (2021)',
                'faq-9-q': 'If I forget and cut my nails, what is the ruling?',
                'faq-9-a': '✓ Must pay dam (one goat)<br>✓ Does not invalidate ihram<br>Source: I\'anah al-Talibin, Chapter on Dam',
                'faq-10-q': 'Can dam be paid in Malaysia?',
                'faq-10-a': '✓ Yes, through Tabung Haji/Zakat Board<br>✗ Invalid if paid after returning without valid excuse<br>Source: JAKIM Dam Guidelines',
                'faq-11-q': 'Is it disliked for menstruating women to enter Masjidil Haram?',
                'faq-11-a': '✗ Not disliked (permissible for tawaf/qada only)<br>✓ Avoid passing through prayer areas<br>Source: Al-Majmu\', Imam Nawawi',
                'faq-12-q': 'Can I use umbrella during ihram?',
                'faq-12-a': '✓ Permissible (to avoid heat)<br>✗ Disliked if for show<br>Source: Johor State Fatwa',
                'faq-13-q': 'Is it obligatory to stay in Mina for 3 nights?',
                'faq-13-a': '✓ Obligatory for those able<br>✗ Excused if unable (sick/hardship)<br>Source: National Fatwa Committee',
                'faq-14-q': 'Can EPF savings be used for hajj?',
                'faq-14-a': '✓ Permissible with conditions:<br>• Meet zakat nisab<br>• Don\'t neglect dependents<br>Source: Bank Negara Fatwa (2017)',
                'faq-15-q': 'What is the ruling on taking photos in mosque areas?',
                'faq-15-a': '✓ Permissible if not disturbing worshippers<br>✗ Forbidden if for show-off/social media<br>Source: JAKIM Guidelines',
                'email-label': 'Email',
                'phone-label': 'Phone',
                'address-label': 'Address',
                'form-title': 'Send us a message',
                'name-placeholder': 'Your Name',
                'email-placeholder': 'Your Email',
                'message-placeholder': 'Your Message',
                'submit-btn': 'Send Message',
                'form-success': 'Thank you for your message! We will contact you soon.',
                'help-text': 'I can guide you about:<br>• Complete Umrah & Hajj pillars, obligations, and recommended acts<br>• Ihram requirements and prohibitions (with DAM classifications)<br>• Women\'s specific rulings during menstruation and Ihram<br>• Children\'s Hajj & Umrah guidance (age requirements, guardian duties)<br>• Authentic Islamic sources and references<br>• All rulings based on Shafi\'i madhab and Malaysian authorities<br><br>📋 You can also check our FAQ section for 15 common questions!<br><br>Ask me about: Umrah, Hajj, Ihram, women\'s guidance, children\'s guidance, or Islamic sources!',
                'goodbye': 'جزاكم الله خيرا!<br>May your Umrah/Hajj be accepted and filled with blessings.<br>Feel free to return anytime for guidance.<br>السلام عليكم! 🤲'
            },
            ms: {
                'chat-title': 'Panduan Umrah & Haji',
                'faq-title': 'Soalan Lazim',
                'contact-title': 'Hubungi Kami',
                'welcome': 'السلام عليكم! 👋<br>Saya Selangkah Ke Baitullah, panduan anda untuk Umrah & Haji.<br>Bagaimana saya boleh bantu anda hari ini?',
                'input-placeholder': 'Tanya tentang Umrah, Haji, Ihram...',
                'typing': 'Menaip...',
                'nav-home': 'Laman Utama',
                'nav-faq': 'Soalan Lazim',
                'nav-contact': 'Hubungi Kami',
                'faq-1-q': 'Bolehkah saya memakai jam tangan/sandal ketika ihram?',
                'faq-1-a': 'Hukum: Harus (tidak membatalkan ihram)<br>Sumber: I\'anah al-Talibin, Bab Ihram',
                'faq-2-q': 'Adakah wanita perlu memakai warna putih untuk ihram?',
                'faq-2-a': 'Hukum: Sunat (tiada warna khusus, cukup menutup aurat)<br>Sumber: Panduan JAKIM (2023)',
                'faq-3-q': 'Bagaimana jika terlupa niat ihram di miqat?',
                'faq-3-a': 'Hukum: Wajib kembali ke miqat atau bayar dam<br>Sumber: Fatwa Wilayah Persekutuan (2021)',
                'faq-4-q': 'Apa yang perlu dilakukan jika uzur (sakit/kaki patah) ketika haji?',
                'faq-4-a': 'Hukum: Wajib diwakilkan (contoh: melontar jamrah oleh wakil)<br>Sumber: Al-Majmu\', Jilid 8',
                'faq-5-q': 'Adakah perlu menyentuh Hajar Aswad setiap pusingan tawaf?',
                'faq-5-a': 'Hukum: Sunat (jika tidak sesak)<br>Sumber: Fath al-Qarib, Bab Tawaf',
                'faq-6-q': 'Adakah perlu berihram semula jika umrah terganggu?',
                'faq-6-a': '✓ Tidak perlu, teruskan proses selepas suci<br>Sumber: Mughni al-Muhtaj, Bab Umrah',
                'faq-7-q': 'Apa hukum memakai wangian selepas mandi ihram?',
                'faq-7-a': '✓ Sunat sebelum niat (elak pada pakaian ihram)<br>✗ Haram jika dipakai selepas ihram<br>Sumber: Hadis Aisyah RA (Sahih Bukhari)',
                'faq-8-q': 'Bolehkah wanita memakai sarung tangan dalam ihram?',
                'faq-8-a': '✗ Haram (wajib bayar dam)<br>✓ Boleh tutup tangan dengan kain longgar<br>Sumber: Fatwa Wilayah Persekutuan (2021)',
                'faq-9-q': 'Jika terlupa dan memotong kuku, apa hukumnya?',
                'faq-9-a': '✓ Wajib bayar dam (seekor kambing)<br>✓ Tidak membatalkan ihram<br>Sumber: I\'anah al-Talibin, Bab Dam',
                'faq-10-q': 'Bolehkah bayar dam di Malaysia?',
                'faq-10-a': '✓ Ya, melalui Tabung Haji/Lembaga Zakat<br>✗ Tidak sah jika dibayar selepas pulang tanpa uzur syarie<br>Sumber: Panduan Dam JAKIM',
                'faq-11-q': 'Adakah makruh wanita haid masuk Masjidil Haram?',
                'faq-11-a': '✗ Tidak makruh (harus untuk tawaf/qada sahaja)<br>✓ Elak lalu di kawasan solat<br>Sumber: Al-Majmu\', Imam Nawawi',
                'faq-12-q': 'Bolehkah pakai payung ketika ihram?',
                'faq-12-a': '✓ Harus (untuk elak panas)<br>✗ Makruh jika untuk gaya<br>Sumber: Fatwa Negeri Johor',
                'faq-13-q': 'Adakah wajib tinggal di Mina 3 malam?',
                'faq-13-a': '✓ Wajib bagi yang mampu<br>✗ Dikecualikan jika uzur (sakit/usaha keras)<br>Sumber: Muzakarah Fatwa Kebangsaan',
                'faq-14-q': 'Bolehkah guna duit simpanan KWSP untuk haji?',
                'faq-14-a': '✓ Harus dengan syarat:<br>• Cukup nisab zakat<br>• Tidak meninggalkan tanggungan<br>Sumber: Fatwa Bank Negara (2017)',
                'faq-15-q': 'Apa hukum bergambar di kawasan masjid?',
                'faq-15-a': '✓ Harus jika tidak mengganggu jemaah<br>✗ Haram jika untuk riak/sosial media<br>Sumber: Garis Panduan JAKIM',        
                'email-label': 'Emel',
                'phone-label': 'Telefon',
                'address-label': 'Alamat',
                'form-title': 'Hantar mesej kepada kami',
                'name-placeholder': 'Nama Anda',
                'email-placeholder': 'Emel Anda',
                'message-placeholder': 'Mesej Anda',
                'submit-btn': 'Hantar Mesej',
                'form-success': 'Terima kasih atas mesej anda! Kami akan menghubungi anda sebentar lagi.',
                'help-text': 'Saya boleh membimbing anda tentang:<br>• Rukun lengkap Umrah & Haji, kewajipan, dan sunat<br>• Syarat Ihram dan larangan-larangan (dengan klasifikasi DAM)<br>• Hukum khusus wanita semasa haid dan Ihram<br>• Panduan Haji & Umrah kanak-kanak (syarat umur, tugas wali)<br>• Sumber Islam sahih dan rujukan<br>• Semua hukum berdasarkan mazhab Syafie dan pihab berkuasa Malaysia<br><br>📋 Anda juga boleh semak bahagian Soalan Lazim untuk 15 soalan biasa!<br><br>Tanya saya tentang: Umrah, Haji, Ihram, panduan wanita, panduan kanak-kanak, atau sumber Islam!',
                'goodbye': 'جزاكم الله خيرا!<br>Terima kasih atas pertanyaan anda!<br>Semoga Umrah/Haji anda diterima dan dipenuhi dengan keberkatan.<br>Jangan ragu untuk kembali bila-bila masa untuk bimbingan.<br>السلام عليكم! 🤲'
            }
        };

        // DOM elements
        this.elements = {
            chatBody: document.getElementById('chatBody'),
            userInput: document.getElementById('userInput'),
            sendBtn: document.getElementById('sendBtn'),
            langToggle: document.getElementById('langToggle'),
            langText: document.getElementById('langText'),
            navButtons: document.querySelectorAll('.nav-btn'),
            mobileLogo: document.querySelector('.mobile-logo'),
            views: document.querySelectorAll('.view'),
            contactForm: document.getElementById('contactForm'),
            loadingIndicator: document.getElementById('loadingIndicator')
        };
  
        this.init();
    }
  
    init() {
        this.setupEventListeners();
        this.updateLanguage();
        this.setupFAQToggle();
        this.focusInput();
    }
  
    setupEventListeners() {
        // Navigation
        this.elements.navButtons.forEach(button => {
            button.addEventListener('click', () => this.switchView(button.dataset.view));
        });
  
        // Mobile logo navigation
        if (this.elements.mobileLogo) {
            this.elements.mobileLogo.addEventListener('click', () => this.switchView('home'));
        }

        // Desktop logo navigation
        const logoSection = document.querySelector('.logo-section');
        if (logoSection) {
        logoSection.addEventListener('click', () => this.switchView('home'));
        }
  
        // Language toggle
        this.elements.langToggle.addEventListener('click', () => this.toggleLanguage());
  
        // Chat functionality
        this.elements.sendBtn.addEventListener('click', () => this.sendMessage());
        this.elements.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
  
        // Contact form
        if (this.elements.contactForm) {
            this.elements.contactForm.addEventListener('submit', (e) => this.handleContactForm(e));
        }
  
        // Auto-resize input
        this.elements.userInput.addEventListener('input', () => this.autoResizeInput());
    }
  
    switchView(viewName) {
        // Update navigation buttons
        this.elements.navButtons.forEach(btn => btn.classList.remove('active'));
        const targetNavBtn = document.querySelector(`.nav-btn[data-view="${viewName}"]`);
        if (targetNavBtn) {
            targetNavBtn.classList.add('active');
        }
    
        // Update mobile logo active state
        if (this.elements.mobileLogo) {
            if (viewName === 'home') {
                this.elements.mobileLogo.classList.add('active');
            } else {
                this.elements.mobileLogo.classList.remove('active');
            }
        }
    
        // Update views
        this.elements.views.forEach(view => view.classList.remove('active'));
        document.getElementById(`${viewName}-view`).classList.add('active');
    
        this.state.currentView = viewName;
    
        // Focus input if switching to home
        if (viewName === 'home') {
            setTimeout(() => this.focusInput(), 100);
        }
    }
  
    toggleLanguage() {
        this.state.currentLanguage = this.state.currentLanguage === 'en' ? 'ms' : 'en';
        this.updateLanguage();
    }
  
    updateLanguage() {
        const lang = this.state.currentLanguage;
        const translations = this.translations[lang];
  
        // Update language toggle text
        this.elements.langText.textContent = lang === 'ms' ? 'EN' : 'BM';
  
        // Update all elements with data-lang attributes
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (translations[key]) {
                element.innerHTML = translations[key];
            }
        });
  
        // Update placeholder attributes
        document.querySelectorAll('[data-lang-placeholder]').forEach(element => {
            const key = element.getAttribute('data-lang-placeholder');
            if (translations[key]) {
                element.placeholder = translations[key];
            }
        });
    }
  
    async sendMessage() {
        const message = this.elements.userInput.value.trim();
        if (!message || this.state.isTyping) return;
  
        // Add user message
        this.addMessage(message, 'user');
        this.elements.userInput.value = '';
        this.autoResizeInput();
  
        // Show typing indicator
        this.showTyping();
  
        // Get response
        const response = await this.getResponse(message);
        
        // Hide typing and show response
        this.hideTyping();
        this.addMessage(response, 'bot');
    }
  
    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `${sender}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = text.replace(/\n/g, '<br>');
        
        messageDiv.appendChild(contentDiv);
        this.elements.chatBody.appendChild(messageDiv);
        
        // Scroll to bottom
        this.scrollToBottom();
        
        // Store in history
        this.state.messageHistory.push({ text, sender, timestamp: Date.now() });
    }
  
    showTyping() {
        this.state.isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typingIndicator';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = `
            <span>${this.translations[this.state.currentLanguage]['typing']}</span>
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        
        typingDiv.appendChild(contentDiv);
        this.elements.chatBody.appendChild(typingDiv);
        this.scrollToBottom();
    }
  
    hideTyping() {
        this.state.isTyping = false;
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
    }
  
    async getResponse(message) {
        // Simulate thinking time
        await this.delay(500);
        
        const msg = message.toLowerCase().trim();
        const lang = this.state.currentLanguage;
    
        // Greetings - keep these as they are quick responses
        if (this.matchesPattern(msg, ['hello', 'hi', 'assalam', 'peace', 'hai', 'selamat', 'apa khabar'])) {
            return lang === 'en' 
                ? "وعليكم السلام! 👋<br>Welcome to Selangkah Ke Baitullah.<br>I'm here to guide you through Umrah & Hajj with authentic Islamic rulings based on Shafi'i madhab and Malaysian authorities.<br>What would you like to know?"
                : "وعليكم السلام! 👋<br>Selamat datang ke Selangkah Ke Baitullah.<br>Saya di sini untuk membimbing anda dalam Umrah & Haji dengan hukum Islam yang sahih berdasarkan mazhab Syafie dan pihak berkuasa Malaysia.<br>Apakah yang ingin anda ketahui?";
        }
    
        // Help/guidance - keep as quick response
        if (this.matchesPattern(msg, ['help', 'what can you do', 'guide', 'bantuan', 'apa boleh buat', 'panduan', 'tolong'])) {
            return lang === 'en'
                ? this.translations[lang]['help-text']
                : this.translations[lang]['help-text'];
        }
    
        // Goodbye - keep as quick response
        if (this.matchesPattern(msg, ['bye', 'goodbye', 'shukran', 'thanks', 'selamat tinggal', 'terima kasih'])) {
            return this.translations[lang]['goodbye'];
        }
    
        // For all other questions, use AI with better error handling
        try {
            console.log('Sending message to AI:', message);
            
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 second timeout
            
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    language: lang
                }),
                signal: controller.signal
            });
    
            clearTimeout(timeoutId);
    
            if (response.ok) {
                const data = await response.json();
                console.log('AI Response received:', data.answer);
                return data.answer;
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            console.error('AI Error:', error);
            
            if (error.name === 'AbortError') {
                return lang === 'en'
                    ? "The response is taking too long. Please try asking a shorter or simpler question."
                    : "Respons mengambil masa terlalu lama. Sila cuba tanya soalan yang lebih pendek atau mudah.";
            }
            
            // Fallback to a default response if AI fails
            return lang === 'en'
                ? "I'm sorry, I'm having trouble accessing my knowledge base right now. Please try asking about specific topics like 'Umrah steps', 'Hajj pillars', 'Ihram rules', 'women guidance', or check our FAQ section."
                : "Maaf, saya menghadapi masalah mengakses pangkalan pengetahuan saya sekarang. Sila cuba tanya tentang topik khusus seperti 'Langkah Umrah', 'Rukun Haji', 'Larangan Ihram', 'panduan wanita', atau semak bahagian Soalan Lazim.";
        }
    }
  
    matchesPattern(text, patterns) {
        return patterns.some(pattern => {
            // Remove extra spaces and check if pattern words are in the text
            const patternWords = pattern.toLowerCase().split(' ');
            return patternWords.every(word => text.includes(word));
        });
    }
  
    getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }
  
    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
  
    scrollToBottom() {
        setTimeout(() => {
            this.elements.chatBody.scrollTop = this.elements.chatBody.scrollHeight;
        }, 100);
    }
  
    focusInput() {
        if (this.elements.userInput && this.state.currentView === 'home') {
            this.elements.userInput.focus();
        }
    }
  
    autoResizeInput() {
        const input = this.elements.userInput;
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 120) + 'px';
    }
  
    handleContactForm(e) {
        e.preventDefault();
        const lang = this.state.currentLanguage;
        
        const form = e.target;
        
        // Get actual input values directly from form elements
        const nameInput = form.querySelector('input[type="text"]');
        const emailInput = form.querySelector('input[type="email"]');
        const messageInput = form.querySelector('textarea');
        
        const actualName = nameInput?.value || '';
        const actualEmail = emailInput?.value || '';
        const actualMessage = messageInput?.value || '';
        
        // Validate email
        if (!this.validateEmail(actualEmail)) {
            alert(lang === 'en' ? 'Please enter a valid email address' : 'Sila masukkan alamat emel yang sah');
            return;
        }
        
        // Create contact options popup
        this.createContactPopup(actualName, actualEmail, actualMessage, lang);
        
        // Reset form after short delay
        setTimeout(() => {
            form.reset();
        }, 1000);
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    createContactPopup(name, email, message, lang) {
        // Email content
        const emailSubject = encodeURIComponent(lang === 'en' ? `Inquiry from ${name}` : `Pertanyaan daripada ${name}`);
        const emailBody = encodeURIComponent(lang === 'en' 
? `Assalamualaikum Rehlah International Travel & Tours Sdn. Bhd.,
    
I'm interested in your Umrah & Hajj services.
    
My details:
Name: ${name}
Email: ${email}
Message: ${message}
    
Thank you!`
: `Assalamualaikum Rehlah International Travel & Tours Sdn. Bhd.,
    
Saya berminat dengan perkhidmatan Umrah & Haji anda.
    
Butiran saya:
Nama: ${name}
Emel: ${email}
Mesej: ${message}
    
Terima kasih!`);
        
        // WhatsApp content
        const whatsappMessage = encodeURIComponent(lang === 'en'
            ? `Hi Rehla International,\n\nI'm interested in your Umrah & Hajj services.\n\nMy details:\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n\nThank you!`
            : `Assalamualaikum Rehla International,\n\nSaya berminat dengan perkhidmatan Umrah & Haji anda.\n\nButiran saya:\nNama: ${name}\nEmel: ${email}\nMesej: ${message}\n\nTerima kasih!`);
        
        const popup = document.createElement('div');
        popup.id = 'contactPopup';
        popup.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 10000; display: flex; align-items: center; justify-content: center; animation: fadeIn 0.3s ease;">
                <div style="background: linear-gradient(135deg, #2a2a2a, #1a1a1a); padding: 35px; border-radius: 20px; max-width: 450px; width: 90%; text-align: center; border: 2px solid #404040; box-shadow: 0 20px 60px rgba(0,0,0,0.5);">
                    <h3 style="margin-bottom: 25px; color: #ffffff; font-size: 1.4rem;">${lang === 'en' ? 'Choose your contact method:' : 'Pilih kaedah hubungan:'}</h3>
                    <div style="display: flex; flex-direction: column; gap: 15px;">
                        <a href="mailto:rehlahinternational@gmail.com?subject=${emailSubject}&body=${emailBody}" 
                           onclick="document.getElementById('contactPopup').remove();" 
                           style="background: linear-gradient(135deg, #e63946, #d62828); color: white; padding: 15px 25px; text-decoration: none; border-radius: 12px; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 10px; transition: all 0.3s ease; border: 2px solid transparent;">
                            <i class="fas fa-envelope" style="font-size: 1.2rem;"></i>
                            ${lang === 'en' ? 'Email (Default Client)' : 'Emel (Klien Lalai)'}
                        </a>
                        <a href="https://mail.google.com/mail/?view=cm&to=rehlahinternational@gmail.com&subject=${emailSubject}&body=${emailBody}" 
                           target="_blank" 
                           onclick="document.getElementById('contactPopup').remove();" 
                           style="background: linear-gradient(135deg, #EA4335, #D32F2F); color: white; padding: 15px 25px; text-decoration: none; border-radius: 12px; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 10px; transition: all 0.3s ease; border: 2px solid transparent;">
                            <i class="fab fa-google" style="font-size: 1.2rem;"></i>
                            Gmail
                        </a>
                        <a href="https://outlook.live.com/mail/0/deeplink/compose?to=rehlahinternational@gmail.com&subject=${emailSubject}&body=${emailBody}" 
                           target="_blank" 
                           onclick="document.getElementById('contactPopup').remove();" 
                           style="background: linear-gradient(135deg, #0078d4, #0063b1); color: white; padding: 15px 25px; text-decoration: none; border-radius: 12px; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 10px; transition: all 0.3s ease; border: 2px solid transparent;">
                            <i class="fab fa-microsoft" style="font-size: 1.2rem;"></i>
                            Outlook
                        </a>
                        <a href="https://wa.me/60108681889?text=${whatsappMessage}" 
                           target="_blank" 
                           onclick="document.getElementById('contactPopup').remove();" 
                           style="background: linear-gradient(135deg, #25D366, #128C7E); color: white; padding: 15px 25px; text-decoration: none; border-radius: 12px; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 10px; transition: all 0.3s ease; border: 2px solid transparent;">
                            <i class="fab fa-whatsapp" style="font-size: 1.2rem;"></i>
                            WhatsApp
                        </a>
                        <button onclick="document.getElementById('contactPopup').remove();" 
                                style="background: #404040; color: white; padding: 12px 25px; border: none; border-radius: 12px; cursor: pointer; margin-top: 10px; font-weight: 600; transition: all 0.3s ease;">
                            ${lang === 'en' ? 'Cancel' : 'Batal'}
                        </button>
                    </div>
                </div>
            </div>
            <style>
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                a:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(255,255,255,0.2) !important;
                }
                button:hover {
                    background: #606060 !important;
                }
            </style>
        `;
        
        document.body.appendChild(popup);
    }

    setupFAQToggle() {
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const isActive = faqItem.classList.contains('active');
                
                // Close all other FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Toggle current item
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });
    }
    getWomenGuidance() {
        const lang = this.state.currentLanguage;
        return lang === 'en' 
            ? "👩 **Women's Guidance:**<br>• During menstruation: Cannot perform Tawaf, but can do Sa'i<br>• Ihram: Regular modest clothing, no niqab/gloves<br>• Must be accompanied by Mahram<br>*Source: Malaysian Fatwa Authorities*"
            : "👩 **Panduan Wanita:**<br>• Semasa haid: Tidak boleh tawaf, tetapi boleh saie<br>• Ihram: Pakaian sopan biasa, tiada niqab/sarung tangan<br>• Mesti ditemani Mahram<br>*Sumber: Pihak Berkuasa Fatwa Malaysia*";
    }
  }
  
  // Initialize app when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    window.islamicApp = new IslamicGuidanceApp();
  });
  
  // Export for potential external use
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = IslamicGuidanceApp;
  }