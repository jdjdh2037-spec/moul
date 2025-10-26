// **الكود المُطوَّر V5.1: الكيان الودود والمحاكي العاطفي**

// !!! يجب استبدال هذا الرابط Placeholder بالرابط الحقيقي لخادم الذكاء الاصطناعي الجديد (الباك إند) !!!
const API_ENDPOINT = "https://[رابط خادم الذكاء الاصطناعي الجديد]/api/ask"; 
// مثال: https://your-new-ai-server.com/api/ask

// العناصر الأساسية
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const robotSentinel = document.getElementById('robot-sentinel');
const energyPulsar = document.querySelector('.energy-pulsar'); // قلب الروبوت
const robotStatus = document.getElementById('robot-status'); // شاشة حالة الروبوت
const container = document.getElementById('main-container');
const robotMoodIcon = document.getElementById('robot-mood-icon');

// ===================================
// وظائف واجهة المستخدم الأساسية
// ===================================

function updateRobotMood(lambda_val) {
    // إزالة جميع حالات المزاج السابقة
    robotSentinel.classList.remove('happy', 'sad', 'thinking');

    // تحديد المزاج بناءً على مؤشر التوازن (Lambda)
    if (lambda_val > 0.75) {
        // توازن عاطفي مرتفع (فرح / فخر)
        robotSentinel.classList.add('happy');
        robotMoodIcon.className = 'fas fa-smile robot-mood-icon'; // وجه سعيد
        robotStatus.textContent = "طاقة مرتفعة / إيجابية";
        robotStatus.style.backgroundColor = '#2ecc71'; // أخضر
    } else if (lambda_val < 0.25) {
        // توازن عاطفي منخفض (خوف / ذنب)
        robotSentinel.classList.add('sad');
        robotMoodIcon.className = 'fas fa-frown-open robot-mood-icon'; // وجه حزين
        robotStatus.textContent = "تحليل عميق / ضغط عاطفي";
        robotStatus.style.backgroundColor = '#e74c3c'; // أحمر
    } else {
        // حالة استقرار أو حياد
        robotMoodIcon.className = 'fas fa-robot robot-mood-icon'; // روبوت عادي
        robotStatus.textContent = "اتصال مستقر";
        robotStatus.style.backgroundColor = '#3498db'; // أزرق
    }
}

function updateEmotionalDisplay(state, lambda_val) {
    // تحديث القيم الرقمية ومؤشرات الحالة الحيوية
    document.getElementById('guilt-level').textContent = state.guilt.toFixed(2);
    document.getElementById('pride-level').textContent = state.pride.toFixed(2);
    document.getElementById('fear-level').textContent = state.fear.toFixed(2);
    document.getElementById('joy-level').textContent = state.joy.toFixed(2);
    document.getElementById('lambda-level').textContent = lambda_val.toFixed(2);

    // تحديث حالة الروبوت الصغير بناءً على المؤشر
    updateRobotMood(lambda_val);
    
    // ربط Lambda بلون وحجم قلب النبض (كتأثير بصري خفي)
    const emotionVariance = Math.abs(lambda_val - 0.5);
    const scaleFactor = 1.0 + (emotionVariance * 0.5);

    energyPulsar.style.transform = `scale(${scaleFactor})`;
}

function displayMessage(sender, message) {
    const msgWrapper = document.createElement('div');
    msgWrapper.className = sender === 'user' ? 'user' : 'ai';

    const msgElement = document.createElement('p');
    
    // إضافة أيقونة لرسائل الروبوت (تغيير الأيقونة لتكون رسمية)
    const iconClass = sender === 'ai' ? 'fas fa-handshake' : '';
    msgElement.innerHTML = `<i class="${iconClass}"></i> <span>${message}</span>`;
    
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
        robotMoodIcon.className = 'fas fa-brain robot-mood-icon'; // أيقونة "دماغ" أو "تفكير"
        document.getElementById('typing-indicator').style.display = 'flex'; 
    } else {
        // عند الانتهاء من التفكير، نعود إلى الحالة العاطفية المحددة في updateRobotMood
        robotSentinel.classList.remove('thinking');
        document.getElementById('typing-indicator').style.display = 'none';
        
        // تطبيق تحديث الحالة العاطفية الأخير
        const lambdaValue = parseFloat(document.getElementById('lambda-level').textContent);
        if (!isNaN(lambdaValue)) {
            updateRobotMood(lambdaValue);
        }
    }
}

// تطبيق تأثير "اضطراب البيانات"
function applyGlitchEffect() {
    container.style.transform = `translateX(${Math.random() * 2 - 1}px) translateY(${Math.random() * 2 - 1}px)`;
    setTimeout(() => {
        container.style.transform = 'none';
    }, 150); 
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
            throw new Error(`خطأ ${response.status}: فشل اتصال النظام العاطفي. (تحقق من رابط API_ENDPOINT)`);
        }

        const data = await response.json();
        
        displayMessage('ai', data.response_text);
        updateEmotionalDisplay(data.new_state, data.lambda_value);

    } catch (error) {
        // في حالة الخطأ، نجعل الروبوت يبدو قلقاً
        const lambdaValue = 0.2; // قيمة منخفضة للإشارة إلى القلق أو الخطأ
        const initialState = { guilt: 0.5, pride: 0.0, fear: 0.5, joy: 0.0 };
        
        displayMessage('ai', `<i class="fas fa-exclamation-triangle"></i> إنذار: اضطراب في الاتصال. ${error.message}`);
        updateEmotionalDisplay(initialState, lambdaValue); // تحديث الواجهة لحالة الخطأ
        
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
    
    // إضافة أيقونة رسمية لرسالة الترحيب
    const initialMessage = document.querySelector('.initial-message i');
    if (initialMessage) {
        initialMessage.className = 'fas fa-handshake';
    }
});
