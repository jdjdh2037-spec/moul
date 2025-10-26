// **الكود المُطوَّر V5: التفاعل الحيوي والكيان الديناميكي**

const API_ENDPOINT = "https://oo-4.onrender.com/api/ask"; 

// العناصر الأساسية
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const robotSentinel = document.getElementById('robot-sentinel');
const energyPulsar = document.querySelector('.energy-pulsar'); // قلب الروبوت
const robotStatus = document.getElementById('robot-status'); // شاشة حالة الروبوت
const container = document.getElementById('main-container');

// ===================================
// وظائف واجهة المستخدم الأساسية
// ===================================

function updateEmotionalDisplay(state, lambda_val) {
    // تحديث القيم الرقمية ومؤشرات الحالة الحيوية
    document.getElementById('guilt-level').textContent = state.guilt.toFixed(2);
    document.getElementById('pride-level').textContent = state.pride.toFixed(2);
    document.getElementById('fear-level').textContent = state.fear.toFixed(2);
    document.getElementById('joy-level').textContent = state.joy.toFixed(2);
    document.getElementById('lambda-level').textContent = lambda_val.toFixed(2);

    // **ابتكار V5: ربط Lambda بلون وحجم قلب الروبوت (Energy Pulsar)**
    
    // 1. حجم النبض (كلما ابتعد عن 0.5، زاد النبض أو الانكماش)
    const emotionVariance = Math.abs(lambda_val - 0.5);
    const scaleFactor = 1.0 + (emotionVariance * 0.5); // تتراوح بين 1.0 و 1.25 (1.5 عند التطرف)

    // 2. لون قلب النبض (من الأزرق الهادئ إلى الألوان الحارة عند التطرف)
    let coreColor = '#3498db'; // اللون الافتراضي الأزرق
    let shadowColor = 'rgba(52, 152, 219, 0.7)';

    if (lambda_val > 0.75) {
        // فخر وفرح مرتفع (أخضر / توهج أبيض) - حالة مثلى
        coreColor = '#2ecc71'; // Success Green
        shadowColor = 'rgba(46, 204, 113, 1)';
        robotStatus.textContent = "طاقة مرتفعة / استجابة مثلى";
        robotStatus.style.backgroundColor = '#2ecc71';
    } else if (lambda_val > 0.6) {
        coreColor = '#f1c40f'; // Accent Yellow
        shadowColor = 'rgba(241, 196, 15, 0.9)';
        robotStatus.textContent = "اتصال مستقر / تركيز";
        robotStatus.style.backgroundColor = '#f1c40f';
    } else if (lambda_val < 0.25) {
        // ذنب وخوف مرتفع (أحمر / توهج برتقالي) - إجهاد عاطفي
        coreColor = '#e74c3c'; // Alert Red
        shadowColor = 'rgba(231, 76, 60, 1)';
        robotStatus.textContent = "تحليل عميق / إجهاد عاطفي";
        robotStatus.style.backgroundColor = '#e74c3c';
    } else {
        // توازن أو حالة عادية
        robotStatus.textContent = "اتصال مستقر";
        robotStatus.style.backgroundColor = '#3498db';
    }

    energyPulsar.style.backgroundColor = coreColor;
    energyPulsar.style.boxShadow = `0 0 15px ${shadowColor}`;
    energyPulsar.style.transform = `scale(${scaleFactor})`;
}

function displayMessage(sender, message) {
    const msgWrapper = document.createElement('div');
    msgWrapper.className = sender === 'user' ? 'user' : 'ai';

    const msgElement = document.createElement('p');
    
    // إضافة أيقونة لرسائل الروبوت
    if (sender === 'ai') {
        msgElement.innerHTML = `<i class="fas fa-wave-square"></i> <span>${message}</span>`;
    } else {
        msgElement.innerHTML = `<span>${message}</span>`;
    }

    msgWrapper.appendChild(msgElement);
    chatBox.insertBefore(msgWrapper, document.getElementById('typing-indicator')); 
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ===================================
// وظائف الروبوت والخلل (الكيان الديناميكي)
// ===================================

function setRobotThinking(isThinking) {
    if (isThinking) {
        robotSentinel.classList.add('thinking');
        document.getElementById('typing-indicator').style.display = 'flex'; 
    } else {
        robotSentinel.classList.remove('thinking');
        document.getElementById('typing-indicator').style.display = 'none';
    }
}

// تطبيق تأثير "اضطراب البيانات" (اهتزاز طفيف للواجهة)
function applyGlitchEffect() {
    container.style.transform = `translateX(${Math.random() * 2 - 1}px) translateY(${Math.random() * 2 - 1}px)`;
    setTimeout(() => {
        container.style.transform = 'none';
    }, 150); // تحكم بسيط في مدة الاضطراب
}

// ===================================
// وظيفة الإرسال الرئيسية
// ===================================

async function sendMessage() {
    const prompt = userInput.value.trim();
    if (!prompt) return;

    displayMessage('user', prompt);
    userInput.value = '';

    userInput.disabled = true;
    sendButton.disabled = true;
    
    setRobotThinking(true); 
    applyGlitchEffect(); 

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: prompt }) 
        });

        if (!response.ok) {
            throw new Error(`خطأ ${response.status}: فشل اتصال النظام العاطفي.`);
        }

        const data = await response.json();
        
        displayMessage('ai', data.response_text);
        updateEmotionalDisplay(data.new_state, data.lambda_value);

    } catch (error) {
        displayMessage('ai', `<i class="fas fa-exclamation-triangle"></i> إنذار! اضطراب في الاتصال: ${error.message}`);
        console.error("Error communicating with API:", error);
    } finally {
        userInput.disabled = false;
        sendButton.disabled = false;
        setRobotThinking(false); 
        userInput.focus(); 
    }
}

// تفعيل الإرسال
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
sendButton.addEventListener('click', sendMessage);

// تحديث مبدئي للواجهة عند التحميل 
document.addEventListener('DOMContentLoaded', () => {
    // قيم افتراضية للتوازن
    const initialState = { guilt: 0.1, pride: 0.1, fear: 0.1, joy: 0.1 };
    const initialLambda = 0.50; 
    updateEmotionalDisplay(initialState, initialLambda);
});
