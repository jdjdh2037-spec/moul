// **الكود المُطوَّر V22: الذكاء الاصطناعي الأبدي (الواجهة الكمومية)**

// ===================================
// إعدادات API (بما في ذلك مفتاحك المضاف سابقًا)
// ===================================
const GEMINI_API_KEY = "AIzaSyBG0zkPOSCtRF34QClhP2Kn8Xep8b5_iNU"; 
const SIMULATION_API_ENDPOINT = "https://oo-4.onrender.com/api/ask"; 

// ===================================
// عناصر الواجهة الرئيسية
// ===================================
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const robotSentinel = document.getElementById('robot-sentinel');
const answerGlareOverlay = document.getElementById('answer-glare-overlay'); 
const mentalStateDisplay = document.getElementById('mental-state'); 
const hydroLevelBar = document.getElementById('hydro-level'); 
const waveIllusion = document.getElementById('hydro-illusion-wave'); 

// عناصر ملء السائل
const hydroIconFill = document.getElementById('hydro-icon-fill');
const prideFill = document.getElementById('pride-fill');
const guiltFill = document.getElementById('guilt-fill');
const joyFill = document.getElementById('joy-fill');
const fearFill = document.getElementById('fear-fill');
// ملاحظة: في V18 و V22 تم إزالة fill من HTML، لكن المتغيرات محفوظة لوظائف التحديث
const emotionFills = { pride: prideFill, guilt: guiltFill, joy: joyFill, fear: fearFill }; 

let currentHydroLevel = 0; 

// ===================================
// وظائف العرض والرسائل
// ===================================

function displayMessage(sender, message) {
    const msgElement = document.createElement('div');
    msgElement.className = sender + ' message-bubble';
    
    if (sender === 'ai' || sender === 'error') {
        const iconClass = sender === 'ai' ? 'fas fa-satellite-dish' : 'fas fa-exclamation-triangle';
        msgElement.innerHTML = `<i class="${iconClass}"></i> <p>${message}</p>`;
    } else {
        msgElement.innerHTML = `<p>${message}</p>`;
    }

    const typingIndicator = document.getElementById('typing-indicator');
    chatBox.insertBefore(msgElement, typingIndicator); 
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ===================================
// وظائف التحكم في الروبوت وتفاعلاته (V22)
// ===================================

function setRobotThinking(isThinking) {
    const typingIndicator = document.getElementById('typing-indicator');
    const hologram = document.querySelector('.nano-hologram-structure');
    
    if (isThinking) {
        typingIndicator.style.display = 'flex'; 
        robotSentinel.classList.add('thinking'); 
        hologram.style.animation = 'flicker 0.05s infinite alternate';
    } else {
        typingIndicator.style.display = 'none';
        robotSentinel.classList.remove('thinking');
        hologram.style.animation = 'flicker 0.1s infinite alternate';
    }
}

function triggerAnswerGlare() {
    answerGlareOverlay.style.transition = 'opacity 0.1s ease-in';
    answerGlareOverlay.style.opacity = 0.4; 

    setTimeout(() => {
        answerGlareOverlay.style.transition = 'opacity 0.5s ease-out';
        answerGlareOverlay.style.opacity = 0;
    }, 200); 
}

function startWaveReaction() { 
    waveIllusion.style.animation = 'wave-clash-v20 0.5s infinite linear alternate, horizontal-shift 0.8s infinite reverse linear'; 
}

function endWaveReaction() { 
    waveIllusion.style.animation = 'wave-clash-v20 3s infinite linear alternate, horizontal-shift 7s infinite reverse linear'; 
}

function triggerRippleEffect() {
    const button = sendButton;
    let ripple = button.querySelector('.ripple-overlay');
    if (!ripple) return;

    // إضافة الأنماط اللازمة لـ ripple-spread إذا لم تكن موجودة بالفعل في CSS
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes ripple-spread {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(5); opacity: 0; }
        }
    `;
    // تجنب إضافة النمط أكثر من مرة
    if (!document.head.querySelector('style[data-ripple]')) {
        styleSheet.setAttribute('data-ripple', 'true');
        document.head.appendChild(styleSheet);
    }
    
    ripple.style.animation = 'none';
    ripple.offsetHeight; 
    ripple.style.animation = 'ripple-spread 0.5s ease-out';
}


// ===================================
// وظائف تحديث القياسات
// ===================================

function updateHydroLevel(changeAmount) {
    currentHydroLevel = Math.min(100, currentHydroLevel + changeAmount);
    hydroLevelBar.style.width = `${currentHydroLevel}%`;
    hydroIconFill.style.height = `${currentHydroLevel}%`; 

    if (currentHydroLevel >= 100) {
        setTimeout(() => {
            currentHydroLevel = 0;
            hydroLevelBar.style.width = '0%';
            hydroIconFill.style.height = '0%';
        }, 1500);
    }
}

function updateEmotionalDisplay(state, lambda_val) {
    document.getElementById('guilt-level').textContent = state.guilt.toFixed(2);
    document.getElementById('pride-level').textContent = state.pride.toFixed(2);
    document.getElementById('fear-level').textContent = state.fear.toFixed(2);
    document.getElementById('joy-level').textContent = state.joy.toFixed(2);
    document.getElementById('lambda-level').textContent = lambda_val.toFixed(2);

    // هذه العناصر لم تعد موجودة في HTML لكن المنطق يبقى
    // emotionFills.pride.style.height = `${state.pride * 100}%`;
    // emotionFills.guilt.style.height = `${state.guilt * 100}%`;
    // emotionFills.joy.style.height = `${state.joy * 100}%`;
    // emotionFills.fear.style.height = `${state.fear * 100}%`;

    updateMentalState(lambda_val); 
}

function updateMentalState(lambda_val) {
    let stateText = 'تراكب كمومي V22';
    let stateColor = '#00ffff'; 

    if (lambda_val > 0.8) {
        stateText = 'محاذاة الزمكان ناجحة';
        stateColor = '#2ecc71'; 
    } else if (lambda_val < 0.2) {
        stateText = 'انحراف في القياس الكمومي';
        stateColor = '#ff4500'; 
    } 
    
    mentalStateDisplay.textContent = stateText;
    mentalStateDisplay.style.backgroundColor = stateColor;
    mentalStateDisplay.style.boxShadow = `0 0 10px ${stateColor}`;
}

// ===================================
// وظيفة الإرسال الرئيسية (العمل الفعلي لـ AI)
// ===================================

async function sendMessage() {
    const prompt = userInput.value.trim();
    if (!prompt) return;

    displayMessage('user', prompt);
    userInput.value = '';

    userInput.disabled = true;
    sendButton.disabled = true;
    
    setRobotThinking(true); 
    startWaveReaction(); 
    triggerRippleEffect(); 

    try {
        const response = await fetch(SIMULATION_API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: prompt }) 
        });

        if (!response.ok) {
            throw new Error(`خطأ ${response.status}: فشل في إنشاء التراكب الكمومي.`);
        }

        const data = await response.json();
        
        displayMessage('ai', data.response_text);
        
        // محاكاة استجابة البيانات الكمومية
        const simulatedState = {
            guilt: Math.random() * 0.5,
            pride: 0.5 + Math.random() * 0.5,
            fear: Math.random() * 0.5,
            joy: 0.5 + Math.random() * 0.5
        };
        const simulatedLambda = 0.5 + (Math.random() - 0.5) * 0.5;

        updateEmotionalDisplay(simulatedState, simulatedLambda);
        updateHydroLevel(20); 

        triggerAnswerGlare(); 

    } catch (error) {
        displayMessage('error', `انهيار في نسيج الزمكان! فشل في إنشاء البيانات الكمومية: ${error.message}`);
    } finally {
        userInput.disabled = false;
        sendButton.disabled = false;
        setRobotThinking(false); 
        endWaveReaction(); 
        userInput.focus(); 
    }
}


// ===================================
// إعداد المستمعين
// ===================================
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
sendButton.addEventListener('click', sendMessage);

// تحديث مبدئي للواجهة عند التحميل (V22)
document.addEventListener('DOMContentLoaded', () => {
    const initialState = { guilt: 0.1, pride: 0.1, fear: 0.1, joy: 0.1 };
    const initialLambda = 0.50; 
    updateEmotionalDisplay(initialState, initialLambda);
    updateHydroLevel(0); 
    setRobotThinking(false); 
});
