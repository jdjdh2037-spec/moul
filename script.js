// **الكود المُطوَّر V4: الكيان المائي ونبض الوعي**

const API_ENDPOINT = "https://oo-4.onrender.com/api/ask"; 

// العناصر الأساسية
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const typingIndicator = document.getElementById('typing-indicator');
const sendButton = document.getElementById('send-button');
const robotSentinel = document.getElementById('robot-sentinel');
const hydroOrb = document.querySelector('.hydro-orb'); // العنصر الجديد للتحكم في الفقاعة
const container = document.getElementById('main-container');

// ===================================
// وظائف واجهة المستخدم الأساسية
// ===================================

function updateEmotionalDisplay(state, lambda_val) {
    // تحديث القيم الرقمية
    document.getElementById('guilt-level').textContent = state.guilt.toFixed(2);
    document.getElementById('pride-level').textContent = state.pride.toFixed(2);
    document.getElementById('fear-level').textContent = state.fear.toFixed(2);
    document.getElementById('joy-level').textContent = state.joy.toFixed(2);
    document.getElementById('lambda-level').textContent = lambda_val.toFixed(2);

    // تحديث العرض البصري للشريط
    const maxVal = 1.00; 
    document.getElementById('guilt-level').style.width = `${Math.min((state.guilt / maxVal) * 100, 100)}%`;
    document.getElementById('pride-level').style.width = `${Math.min((state.pride / maxVal) * 100, 100)}%`;
    document.getElementById('fear-level').style.width = `${Math.min((state.fear / maxVal) * 100, 100)}%`;
    document.getElementById('joy-level').style.width = `${Math.min((state.joy / maxVal) * 100, 100)}%`;

    // **ابتكار V4: ربط Lambda بحجم الفقاعة (النبض)**
    // قيمة لامدا 0.5 تعني الحجم الأساسي (1.0)
    // قيمة لامدا 1.0 تعني تضخّم الفقاعة (1.1)
    // قيمة لامدا 0.0 تعني انكماش الفقاعة (0.9)
    const scaleFactor = 1.0 + ((lambda_val - 0.5) * 0.2); // تتراوح بين 0.9 و 1.1
    hydroOrb.style.transform = `scale(${scaleFactor})`;
}

function displayMessage(sender, message) {
    const msgElement = document.createElement('p');
    msgElement.className = sender;
    msgElement.innerHTML = `${sender === 'user' ? 'أنت' : 'أطلس'}: <span>${message}</span>`;
    chatBox.insertBefore(msgElement, typingIndicator); 
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ===================================
// وظائف الروبوت والخلل (الفقاعة)
// ===================================

function setRobotThinking(isThinking) {
    if (isThinking) {
        robotSentinel.classList.add('thinking');
        typingIndicator.style.display = 'flex'; 
    } else {
        robotSentinel.classList.remove('thinking');
        typingIndicator.style.display = 'none';
    }
}

// تطبيق تأثير "تموج البيانات" (تذبذب طفيف للواجهة)
function applyGlitchEffect() {
    container.style.transform = `translateY(${Math.random() * 2 - 1}px)`; // حركة خفيفة جداً
    setTimeout(() => {
        container.style.transform = 'none';
    }, 100);
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
            throw new Error(`خطأ ${response.status}: فشل في استقبال تموج الوعي.`);
        }

        const data = await response.json();
        
        displayMessage('ai', data.response_text);
        updateEmotionalDisplay(data.new_state, data.lambda_value);

    } catch (error) {
        displayMessage('error', `إنذار! اضطراب في التدفق المائي: ${error.message}`);
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
    const initialState = { guilt: 0.1, pride: 0.1, fear: 0.1, joy: 0.1 };
    const initialLambda = 0.5; 
    updateEmotionalDisplay(initialState, initialLambda);
});
