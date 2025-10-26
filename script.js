// **الكود النهائي المُبتكر: الروبوت أطلس وواجهة التحكم البحري**

const API_ENDPOINT = "https://oo-4.onrender.com/api/ask"; 

// العناصر الأساسية (تحديث المعرّفات)
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const typingIndicator = document.getElementById('typing-indicator');
const sendButton = document.getElementById('send-button');
const robotSentinel = document.getElementById('robot-sentinel');
const container = document.getElementById('main-container');

// ===================================
// وظائف واجهة المستخدم الأساسية (تطوير عرض القياس)
// ===================================

function updateEmotionalDisplay(state, lambda_val) {
    // تحديث قيم شاشات العرض الرقمية (النص)
    document.getElementById('guilt-level').textContent = state.guilt.toFixed(2);
    document.getElementById('pride-level').textContent = state.pride.toFixed(2);
    document.getElementById('fear-level').textContent = state.fear.toFixed(2);
    document.getElementById('joy-level').textContent = state.joy.toFixed(2);
    document.getElementById('lambda-level').textContent = lambda_val.toFixed(2);

    // تحديث طول شريط القياس (التمثيل البصري)
    // نعتبر أن القيمة القصوى هي 1.00 لتحويلها إلى نسبة مئوية
    const maxVal = 1.00; 

    // تطبيق عرض الشريط كنسبة مئوية من القيمة
    document.getElementById('guilt-level').style.width = `${Math.min((state.guilt / maxVal) * 100, 100)}%`;
    document.getElementById('pride-level').style.width = `${Math.min((state.pride / maxVal) * 100, 100)}%`;
    document.getElementById('fear-level').style.width = `${Math.min((state.fear / maxVal) * 100, 100)}%`;
    document.getElementById('joy-level').style.width = `${Math.min((state.joy / maxVal) * 100, 100)}%`;
}

function displayMessage(sender, message) {
    const msgElement = document.createElement('p');
    msgElement.className = sender;
    msgElement.innerHTML = `${sender === 'user' ? 'المستكشف' : 'أطلس'}: <span>${message}</span>`;
    chatBox.insertBefore(msgElement, typingIndicator); 
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ===================================
// وظائف الروبوت المتحرك والخلل (Glitch/Sentinel Interaction)
// ===================================

let sentinelOffset = 0; 
let sentinelDirection = 1;

// حركة اهتزاز "الحارس" (اهتزاز تقني بسيط)
function animateSentinel() {
    sentinelOffset += sentinelDirection * 0.4; // تقليل السرعة لاهتزاز أكثر رزانة
    if (sentinelOffset > 3 || sentinelOffset < -3) { // تقليل المدى
        sentinelDirection *= -1;
    }
    robotSentinel.style.transform = `translateY(${sentinelOffset}px)`;
    requestAnimationFrame(animateSentinel);
}
animateSentinel(); 

function setRobotThinking(isThinking) {
    if (isThinking) {
        // إضافة فئة 'thinking' لتشغيل تأثير الوميض النيون
        robotSentinel.classList.add('thinking');
        typingIndicator.style.display = 'flex'; // إظهار مؤشر الفقاعات
    } else {
        robotSentinel.classList.remove('thinking');
        typingIndicator.style.display = 'none';
    }
}

// تطبيق تأثير خلل "تشويش بروتوكولي"
function applyGlitchEffect() {
    // حركة أشد وأكثر وضوحاً في المحورين
    container.style.transform = `translateX(${Math.random() * 8 - 4}px) translateY(${Math.random() * 8 - 4}px)`;
    container.style.boxShadow = `0 0 40px rgba(255, 69, 0, 0.7), inset 0 0 15px rgba(255, 69, 0, 0.7)`; // وميض برتقالي
    
    setTimeout(() => {
        container.style.transform = 'none';
        container.style.boxShadow = `0 0 30px var(--color-aqua), inset 0 0 10px var(--color-aqua)`; // العودة إلى اللون الأساسي
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
    
    setRobotThinking(true); // الروبوت يفكر (تأثير الوميض)
    applyGlitchEffect(); // تطبيق تأثير الخلل عند الإرسال

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: prompt }) 
        });

        if (!response.ok) {
            throw new Error(`خطأ ${response.status}: فشل الاتصال بالمركز البحري.`);
        }

        const data = await response.json();
        
        displayMessage('ai', data.response_text);
        updateEmotionalDisplay(data.new_state, data.lambda_value);

    } catch (error) {
        displayMessage('error', `إنذار! انقطاع الاتصال: ${error.message}`);
        console.error("Error communicating with API:", error);
    } finally {
        // إعادة التمكين والتهيئة
        userInput.disabled = false;
        sendButton.disabled = false;
        setRobotThinking(false); // إنهاء وضع التفكير وإخفاء مؤشر الفقاعات
        userInput.focus(); // إعادة التركيز على حقل الإدخال
    }
}

// تفعيل الإرسال
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
sendButton.addEventListener('click', sendMessage);

// تحديث مبدئي للواجهة عند التحميل (لإظهار مستوى Lambda الأولي)
document.addEventListener('DOMContentLoaded', () => {
    // قيم افتراضية عند التحميل
    const initialState = { guilt: 0.1, pride: 0.1, fear: 0.1, joy: 0.1 };
    const initialLambda = 0.5; 
    updateEmotionalDisplay(initialState, initialLambda);
});
