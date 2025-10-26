// **الكود المُطوَّر V9: الروبوت الآلي المرح والحالة الذهنية**

const API_ENDPOINT = "https://oo-4.onrender.com/api/ask"; 

// العناصر الأساسية
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const robotSentinel = document.getElementById('robot-sentinel');
const mentalStateDisplay = document.getElementById('mental-state'); // مؤشر الحالة الذهنية
const typingIndicator = document.getElementById('typing-indicator');

// ===================================
// وظائف واجهة المستخدم الأساسية
// ===================================

// تحديد الحالة الذهنية بناءً على قيمة Lambda
function updateMentalState(lambda_val) {
    let stateText = 'محايد';
    let stateColor = '#79d6f2';

    if (lambda_val > 0.8) {
        stateText = 'متفائل جداً';
        stateColor = '#2ecc71'; // أخضر (سعيد/واثق)
    } else if (lambda_val > 0.6) {
        stateText = 'مرح';
        stateColor = '#ff4d6d'; // وردي (مرح)
    } else if (lambda_val < 0.2) {
        stateText = 'منعزل/تحليلي';
        stateColor = '#e74c3c'; // أحمر (قلق/ذنب)
    } else if (lambda_val < 0.4) {
        stateText = 'هادئ';
        stateColor = '#f1c40f'; // أصفر (محايد/متأمل)
    }
    
    mentalStateDisplay.textContent = stateText;
    mentalStateDisplay.style.backgroundColor = stateColor;
    mentalStateDisplay.style.boxShadow = `0 0 10px ${stateColor}`;
}

function updateEmotionalDisplay(state, lambda_val) {
    // ... تحديث الأرقام والمؤشرات ...
    document.getElementById('guilt-level').textContent = state.guilt.toFixed(2);
    document.getElementById('pride-level').textContent = state.pride.toFixed(2);
    document.getElementById('fear-level').textContent = state.fear.toFixed(2);
    document.getElementById('joy-level').textContent = state.joy.toFixed(2);
    document.getElementById('lambda-level').textContent = lambda_val.toFixed(2);

    updateMentalState(lambda_val); // تحديث الحالة الذهنية
}

function displayMessage(sender, message) {
    const msgElement = document.createElement('p');
    msgElement.className = sender;
    
    if (sender === 'ai') {
        msgElement.innerHTML = `<i class="fas fa-hand-sparkles"></i> <p>${message}</p>`;
    } else {
        msgElement.innerHTML = `<span>${message}</span>`;
    }

    chatBox.insertBefore(msgElement, typingIndicator); 
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ===================================
// ابتكار V9: تفاعل الروبوت (اللعب والحركة)
// ===================================

function setRobotThinking(isThinking) {
    if (isThinking) {
        typingIndicator.style.display = 'flex'; 
        
        // **الروبوت يغرق استعداداً للتحليل (إيقاف اللعب والبدء في الغرق)**
        robotSentinel.classList.remove('answering');
        robotSentinel.classList.remove('playing'); // إيقاف الرسوم المتحركة الأساسية إن وجدت
        robotSentinel.classList.add('thinking'); 

    } else {
        typingIndicator.style.display = 'none';
        robotSentinel.classList.remove('thinking');
        
        // **الروبوت يقفز فرحاً بالإجابة (قفزة الإجابة)**
        robotSentinel.classList.add('answering');
        
        // إعادة الروبوت لوضع اللعب بعد القفز
        setTimeout(() => {
            robotSentinel.classList.remove('answering');
            // هنا يمكن إعادة تشغيل الرسوم المتحركة الأساسية (continuous-jump)
            // والتي يجب أن يتم تطبيقها على العنصر مباشرة في CSS
        }, 1000); // 
    }
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
    
    setRobotThinking(true); // الروبوت يغرق
    
    // محاكاة تأثير اهتزاز بسيط
    container.style.transform = `scale(1.005)`;
    setTimeout(() => { container.style.transform = 'none'; }, 100); 

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: prompt }) 
        });

        if (!response.ok) {
            throw new Error(`خطأ ${response.status}: فشل في استقبال بيانات القفزة الكمّيّة.`);
        }

        const data = await response.json();
        
        displayMessage('ai', data.response_text);
        updateEmotionalDisplay(data.new_state, data.lambda_value);

    } catch (error) {
        displayMessage('error', `إنذار! تشويش في دفق البيانات: ${error.message}`);
        console.error("Error communicating with API:", error);
    } finally {
        userInput.disabled = false;
        sendButton.disabled = false;
        setRobotThinking(false); // الروبوت يقفز فرحاً
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
    const initialLambda = 0.50; 
    updateEmotionalDisplay(initialState, initialLambda);
});
