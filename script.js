// **الكود النهائي: الروبوت المتفاعل ونظام الخلل**

const API_ENDPOINT = "https://oo-4.onrender.com/api/ask"; 

// العناصر الأساسية
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const typingIndicator = document.getElementById('typing-indicator');
const sendButton = document.getElementById('send-button');
const robotSentinel = document.getElementById('robot-sentinel');
const container = document.querySelector('.container');

// ===================================
// وظائف واجهة المستخدم الأساسية
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

// ===================================
// وظائف الروبوت المتحرك والخلل (Glitch/Sentinel Interaction)
// ===================================

let sentinelOffset = 0; 
let sentinelDirection = 1;

// حركة اهتزاز ميكانيكية بسيطة
function animateSentinel() {
    sentinelOffset += sentinelDirection * 0.8;
    if (sentinelOffset > 5 || sentinelOffset < -5) {
        sentinelDirection *= -1;
    }
    // حركة اهتزاز بسيطة في المحور الرأسي
    robotSentinel.style.transform = `translateY(${sentinelOffset}px)`;
    requestAnimationFrame(animateSentinel);
}
animateSentinel(); 

function setRobotThinking(isThinking) {
    if (isThinking) {
        robotSentinel.classList.add('thinking');
    } else {
        robotSentinel.classList.remove('thinking');
    }
}

// تطبيق تأثير خلل سريع على الحاوية
function applyGlitchEffect() {
    container.style.transform = `translateX(${Math.random() * 5 - 2.5}px) translateY(${Math.random() * 5 - 2.5}px)`;
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
    typingIndicator.style.display = 'flex';
    
    setRobotThinking(true); // الروبوت يفكر (لون مختلف)
    applyGlitchEffect(); // تطبيق تأثير الخلل عند الإرسال

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
        displayMessage('error', `خطأ في البروتوكول: ${error.message}`);
        console.error("Error communicating with API:", error);
    } finally {
        userInput.disabled = false;
        sendButton.disabled = false;
        typingIndicator.style.display = 'none';
        setRobotThinking(false); // إنهاء وضع التفكير
    }
}

// تفعيل الإرسال
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
sendButton.addEventListener('click', sendMessage);
