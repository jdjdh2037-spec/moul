// **الكود المُطوَّر V24: الترحيب الهادئ والمعايرة النانوية**

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
const hydroIconFill = document.getElementById('hydro-icon-fill');
const nanoArm = document.getElementById('nano-arm'); // ذراع الروبوت (V24)

let currentHydroLevel = 0; 

// ===================================
// وظائف التحكم في الروبوت وتفاعلاته (V24)
// ===================================

function setRobotThinking(isThinking) {
    const typingIndicator = document.getElementById('typing-indicator');
    const hologram = document.querySelector('#robot-sentinel .nano-hologram-structure');
    
    if (isThinking) {
        typingIndicator.style.display = 'flex'; 
        robotSentinel.classList.add('thinking'); 
        // زيادة وميض الهولوغرام عند التفكير
        if (hologram) hologram.style.animation = 'flicker 0.05s infinite alternate';
        // تثبيت الذراع أثناء التفكير
        if (nanoArm) nanoArm.style.animation = 'none';
    } else {
        typingIndicator.style.display = 'none';
        robotSentinel.classList.remove('thinking');
        if (hologram) hologram.style.animation = 'flicker 0.15s infinite alternate';
        // إعادة تشغيل الترحيب ببطء (كدلالة على الاستعداد)
        startGreetingAnimation(); 
    }
}

function startGreetingAnimation() {
    // تشغيل الحركة البطيئة للترحيب عند الاستعداد (V24)
    if (nanoArm) {
        // إزالة أي حركة سابقة
        nanoArm.style.animation = 'none'; 
        nanoArm.offsetHeight; // إعادة تشغيل الحركة
        // حركة أبطأ للترحيب الهادئ
        nanoArm.style.animation = 'wave-greeting 2s infinite ease-in-out alternate';
    }
}

// ... (بقية وظائف التفاعلات الأخرى ثابتة من V23) ...

function updateMentalState(lambda_val) {
    // تحديث حالة الروبوت (V24)
    let stateText = 'معايرة نانوية V24';
    let stateColor = '#ff4500'; // برتقالي مشرق

    if (lambda_val > 0.8) {
        stateText = 'نظام مدقق وواضح';
        stateColor = '#2ecc71'; 
    } else if (lambda_val < 0.2) {
        stateText = 'بحاجة لإعادة المعايرة';
        stateColor = '#00bfff'; 
    } 
    
    if (mentalStateDisplay) {
        mentalStateDisplay.textContent = stateText;
        mentalStateDisplay.style.backgroundColor = stateColor;
        mentalStateDisplay.style.boxShadow = `0 0 10px ${stateColor}`;
    }
}

// ... (بقية وظيفة sendMessage و updateHydroLevel ثابتة) ...


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
    const initialState = { guilt: 0.1, pride: 0.1, fear: 0.1, joy: 0.1 };
    const initialLambda = 0.50; 
    updateEmotionalDisplay(initialState, initialLambda);
    updateHydroLevel(0); 
    setRobotThinking(false); 
    startGreetingAnimation(); // تشغيل الترحيب عند تحميل الصفحة (V24)
});
