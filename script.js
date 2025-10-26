// **الكود المُطوَّر V25: المعايرة المتكاملة والثبات الهيكلي**

// ===================================
// إعدادات API (تذكير: تحتاج إلى API حقيقي لـ Gemini)
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
const hydroIconFill = document.getElementById('hydro-icon-fill');
const nanoArm = document.getElementById('nano-arm'); 

let currentHydroLevel = 0; 

// ===================================
// وظائف العرض والرسائل
// ===================================

function displayMessage(sender, message) {
    const msgElement = document.createElement('div');
    msgElement.className = sender + ' message-bubble';
    
    if (sender === 'ai' || sender === 'error') {
        // أيقونة جديدة لـ V25
        const iconClass = sender === 'ai' ? 'fas fa-microscope' : 'fas fa-exclamation-triangle';
        msgElement.innerHTML = `<i class="${iconClass}"></i> <p>${message}</p>`;
    } else {
        msgElement.innerHTML = `<p>${message}</p>`;
    }

    const typingIndicator = document.getElementById('typing-indicator');
    chatBox.insertBefore(msgElement, typingIndicator); 
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ===================================
// وظائف التحكم في الروبوت وتفاعلاته (V25)
// ===================================

function setRobotThinking(isThinking) {
    const typingIndicator = document.getElementById('typing-indicator');
    const hologram = document.querySelector('#robot-sentinel .nano-hologram-structure');
    
    if (isThinking) {
        typingIndicator.style.display = 'flex'; 
        robotSentinel.classList.add('thinking'); 
        // وميض أسرع عند التفكير
        if (hologram) hologram.style.animation = 'flicker 0.05s infinite alternate';
        // تثبيت الذراع أثناء التفكير
        if (nanoArm) nanoArm.style.animation = 'none'; 
    } else {
        typingIndicator.style.display = 'none';
        robotSentinel.classList.remove('thinking');
        // وميض أبطأ عند الراحة
        if (hologram) hologram.style.animation = 'flicker 0.15s infinite alternate';
        // إعادة تشغيل الترحيب ببطء
        startGreetingAnimation(); 
    }
}

function startGreetingAnimation() {
    // تشغيل الحركة البطيئة للترحيب عند الاستعداد (V25)
    if (nanoArm) {
        nanoArm.style.animation = 'none'; 
        nanoArm.offsetHeight; 
        // حركة أبطأ للترحيب الهادئ (2 ثانية)
        nanoArm.style.animation = 'wave-greeting 2s infinite ease-in-out alternate';
    }
}

function triggerAnswerGlare() {
    answerGlareOverlay.style.transition = 'opacity 0.1s ease-in';
    answerGlareOverlay.style.background = 'radial-gradient(circle, rgba(255, 165, 0, 0.7) 0%, rgba(255, 165, 0, 0) 70%)';
    answerGlareOverlay.style.opacity = 0.4; 

    setTimeout(() => {
        answerGlareOverlay.style.transition = 'opacity 0.5s ease-out';
        answerGlareOverlay.style.opacity = 0;
    }, 200); 
}

function startWaveReaction() { 
    // تسريع الأمواج
    if (waveIllusion) waveIllusion.style.animation = 'wave-clash-v20 0.5s infinite linear alternate, horizontal-shift 0.8s infinite reverse linear'; 
}

function endWaveReaction() { 
    // إعادة الأمواج إلى حالتها الطبيعية
    if (waveIllusion) waveIllusion.style.animation = 'wave-clash-v20 3s infinite linear alternate, horizontal-shift 7s infinite reverse linear'; 
}

function triggerRippleEffect() {
    const button = sendButton;
    let ripple = button.querySelector('.ripple-overlay');
    if (!ripple) return;

    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes ripple-spread {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(5); opacity: 0; }
        }
    `;
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
    if (hydroLevelBar) hydroLevelBar.style.width = `${currentHydroLevel}%`;
    if (hydroIconFill) hydroIconFill.style.height = `${currentHydroLevel}%`; 

    if (currentHydroLevel >= 100) {
        setTimeout(() => {
            currentHydroLevel = 0;
            if (hydroLevelBar) hydroLevelBar.style.width = '0%';
            if (hydroIconFill) hydroIconFill.style.height = '0%';
        }, 1500);
    }
}

function updateEmotionalDisplay(state, lambda_val) {
    document.getElementById('guilt-level').textContent = state.guilt.toFixed(2);
    document.getElementById('pride-level').textContent = state.pride.toFixed(2);
    document.getElementById('fear-level').textContent = state.fear.toFixed(2);
    document.getElementById('joy-level').textContent = state.joy.toFixed(2);
    document.getElementById('lambda-level').textContent = lambda_val.toFixed(2);

    updateMentalState(lambda_val); 
}

function updateMentalState(lambda_val) {
    // تحديث حالة الروبوت (V25)
    let stateText = 'معايرة متكاملة V25';
    let stateColor = '#ff4500'; 

    if (lambda_val > 0.8) {
        stateText = 'ثبات هيكلي كامل';
        stateColor = '#2ecc71'; 
    } else if (lambda_val < 0.2) {
        stateText = 'تفكك في المعايرة';
        stateColor = '#00bfff'; 
    } 
    
    if (mentalStateDisplay) {
        mentalStateDisplay.textContent = stateText;
        mentalStateDisplay.style.backgroundColor = stateColor;
        mentalStateDisplay.style.boxShadow = `0 0 10px ${stateColor}`;
    }
}

// ===================================
// وظيفة الإرسال الرئيسية (محاكاة AI)
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
        // نقطة نهاية محاكاة، يجب استبدالها بـ API حقيقي
        const response = await fetch(SIMULATION_API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: prompt }) 
        });

        if (!response.ok) {
            throw new Error(`خطأ ${response.status}: فشل في محاكاة الثبات الهيكلي.`);
        }

        const data = await response.json();
        
        displayMessage('ai', data.response_text);
        
        // محاكاة بيانات القياسات
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
        displayMessage('error', `إخفاق في النظام! فشل في إنشاء البيانات المدققة: ${error.message}`);
    } finally {
        userInput.disabled = false;
        sendButton.disabled = false;
        setRobotThinking(false); 
        endWaveReaction(); 
        userInput.focus(); 
    }
}


// ===================================
// إعداد المستمعين والتحميل الأولي
// ===================================
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
sendButton.addEventListener('click', sendMessage);

document.addEventListener('DOMContentLoaded', () => {
    // تعيين الحالات الأولية
    const initialState = { guilt: 0.1, pride: 0.1, fear: 0.1, joy: 0.1 };
    const initialLambda = 0.50; 
    updateEmotionalDisplay(initialState, initialLambda);
    updateHydroLevel(0); 
    setRobotThinking(false); 
    startGreetingAnimation(); // بدء حركة الترحيب
});
