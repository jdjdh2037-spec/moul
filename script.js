// **التعديل النهائي:** تم تعيين رابط API
const API_ENDPOINT = "https://oo-4.onrender.com/api/ask"; 

// العناصر
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const typingIndicator = document.getElementById('typing-indicator');
const sendButton = document.getElementById('send-button');

// ===================================
// وظائف واجهة المستخدم الأساسية (بدون تغيير وظيفي)
// ===================================

function updateEmotionalDisplay(state, lambda_val) {
    document.getElementById('guilt-level').textContent = state.guilt.toFixed(2);
    document.getElementById('pride-level').textContent = state.pride.toFixed(2);
    document.getElementById('fear-level').textContent = state.fear.toFixed(2);
    document.getElementById('joy-level').textContent = state.joy.toFixed(2);
    document.getElementById('lambda-level').textContent = lambda_val.toFixed(2);
}

function displayMessage(sender, message) {
    const msgElement = document.createElement('p');
    msgElement.className = sender;
    msgElement.innerHTML = `${sender === 'user' ? 'أنت' : 'الروبوت'}: <span>${message}</span>`;
    chatBox.insertBefore(msgElement, typingIndicator); 
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
    const prompt = userInput.value.trim();
    if (!prompt) return;

    displayMessage('user', prompt);
    userInput.value = '';

    userInput.disabled = true;
    sendButton.disabled = true;
    typingIndicator.style.display = 'flex';

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: prompt }) 
        });

        if (!response.ok) {
            throw new Error(`خطأ: ${response.status} - فشل الاتصال بخدمة EEAI`);
        }

        const data = await response.json();
        
        displayMessage('ai', data.response_text);
        updateEmotionalDisplay(data.new_state, data.lambda_value);

    } catch (error) {
        displayMessage('error', `حدث خطأ في الاتصال بالخدمة: ${error.message}`);
        console.error("Error communicating with API:", error);
    } finally {
        userInput.disabled = false;
        sendButton.disabled = false;
        typingIndicator.style.display = 'none';
    }
}

// تفعيل الإرسال
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
sendButton.addEventListener('click', sendMessage);


// ===================================
// تأثير الجسيمات الكونية (Particle Effect)
// ===================================

const canvas = document.getElementById('cosmic-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
const PARTICLE_COUNT = 150;

// تعيين حجم القماش لملء الشاشة
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // التنفيذ الأولي

// بناء كائن الجسيمات
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5; // حجم صغير
        this.speedX = Math.random() * 0.3 - 0.15; // حركة بطيئة جداً أفقياً
        this.speedY = Math.random() * 0.3 - 0.15; // حركة بطيئة جداً عمودياً
        this.color = 'rgba(255, 255, 255, ' + Math.random() * 0.7 + 0.2 + ')'; // شفافة ومضيئة
    }

    // تحديث موضع الجسيم
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // إعادة تدوير الجسيمات إذا خرجت من الشاشة
        if (this.x < 0 || this.x > canvas.width) this.x = Math.random() * canvas.width;
        if (this.y < 0 || this.y > canvas.height) this.y = Math.random() * canvas.height;
    }

    // رسم الجسيم
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// إنشاء الجسيمات
function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }
}

// حلقة الرسوم المتحركة الرئيسية
function animate() {
    // محو الشاشة للحركة
    ctx.fillStyle = 'rgba(10, 10, 26, 0.1)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    requestAnimationFrame(animate);
}

// بدء تشغيل النظام
initParticles();
animate();
