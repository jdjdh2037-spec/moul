// **الكود المُطوَّر V30: المحلل الكمومي النظيف**

// ===================================
// إعدادات API (للمحاكاة)
// ===================================
const GEMINI_API_KEY = "AIzaSyBG0zkPOSCtRF34QClhP2Kn8Xep8b5_iNU"; // مفتاح وهمي
const SIMULATION_API_ENDPOINT = "https://oo-4.onrender.com/api/ask"; // نقطة نهاية وهمية

// ===================================
// عناصر الواجهة الرئيسية
// ===================================
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const robotSentinel = document.getElementById('robot-sentinel'); 
const nanoHologram = document.getElementById('nano-hologram-structure');
const emotionHalo = document.getElementById('emotion-halo');
const scannerOverlay = document.getElementById('scanner-overlay');
const lambdaLevelDisplay = document.getElementById('lambda-level'); 
const nanoArm = document.getElementById('nano-arm'); 
const compoundWave1 = document.getElementById('compound-wave-1'); 
const compoundWave2 = document.getElementById('compound-wave-2'); 

// الألوان المحددة في CSS 
const EMOTION_COLORS = {
    calm: '#1abc9c',
    stress: '#e74c3c',
    joy: '#f1c40f',
    fear: '#9b59b6'
};

// ===================================
// وظائف العرض والرسائل
// ===================================

function displayMessage(sender, message) {
    const msgElement = document.createElement('div');
    msgElement.className = sender + ' message-bubble';
    
    if (sender === 'ai' || sender === 'error') {
        const iconClass = sender === 'ai' ? 'fas fa-microscope' : 'fas fa-exclamation-triangle';
        msgElement.innerHTML = `<i class="${iconClass}"></i> <p>${message}</p>`;
    } else {
        msgElement.innerHTML = `<p>${message}</p>`;
    }

    const typingIndicator = document.getElementById('typing-indicator');
    chatBox.insertBefore(msgElement, typingIndicator); 
    chatBox.scrollTop = chatBox.scrollHeight;
}

function setRobotThinking(isThinking) {
    const typingIndicator = document.getElementById('typing-indicator');
    const hologram = document.querySelector('#robot-sentinel .nano-hologram-structure');
    
    if (isThinking) {
        typingIndicator.style.display = 'flex'; 
        robotSentinel.classList.add('thinking'); 
        if (hologram) hologram.style.animation = 'flicker 0.05s infinite alternate';
        if (nanoArm) nanoArm.style.animation = 'none';
    } else {
        typingIndicator.style.display = 'none';
        robotSentinel.classList.remove('thinking');
        if (hologram) hologram.style.animation = 'flicker 0.15s infinite alternate';
        startGreetingAnimation();
    }
}

function startGreetingAnimation() {
    if (nanoArm) {
        nanoArm.style.animation = 'none'; 
        nanoArm.offsetHeight; 
        const nanoHandIcon = nanoArm.querySelector('.nano-hand i');
        if (nanoHandIcon) nanoHandIcon.className = 'fas fa-heart-pulse'; 

        nanoArm.style.animation = 'wave-greeting 2s infinite ease-in-out alternate';
    }
}

function updateMentalState(lambda_val) {
    const formattedLambda = lambda_val.toFixed(2);
    if (lambdaLevelDisplay) {
        lambdaLevelDisplay.textContent = formattedLambda;
        let lambdaColor = EMOTION_COLORS.calm;
        if (lambda_val > 0.8) lambdaColor = EMOTION_COLORS.joy;
        else if (lambda_val < 0.3) lambdaColor = EMOTION_COLORS.stress;
        
        lambdaLevelDisplay.style.color = lambdaColor;
    }
}

// ===================================
// وظائف التحكم في المشاعر والتمثيل البصري (V30)
// ===================================

function updateEmotionVisuals(state) {
    const totalPositive = state.pride + state.joy;
    const totalNegative = state.guilt + state.fear;
    const emotionalIntensity = totalPositive + totalNegative; 
    
    // 1. هالة الروبوت الانفعالية (Halo)
    let haloColor = EMOTION_COLORS.calm;
    if (totalPositive > totalNegative) {
        haloColor = EMOTION_COLORS.joy;
    } else if (totalNegative > 0.5) {
        haloColor = EMOTION_COLORS.stress;
    }

    const shadowSize = Math.min(40, emotionalIntensity * 25); 
    emotionHalo.style.boxShadow = `0 0 ${shadowSize}px ${haloColor}, 0 0 ${shadowSize * 1.5}px ${haloColor} inset`;
    
    // 2. تغير مادة الروبوت (اللزوجة)
    if (totalNegative > totalPositive * 1.5) { 
        nanoHologram.classList.add('viscosity-turbid');
        nanoHologram.classList.remove('viscosity-clear');
    } else {
        nanoHologram.classList.add('viscosity-clear');
        nanoHologram.classList.remove('viscosity-turbid');
    }

    // 3. اهتزاز الواجهة (اضطراب مائي) - تطبيق الكلاس على الـ body
    if (totalNegative > 1.0) { 
        document.body.classList.add('screen-disturb');
    } else {
        document.body.classList.remove('screen-disturb');
    }

    // 4. تحديث الأمواج المركبة
    updateCompoundWave(state);
}

function updateCompoundWave(state) {
    const anxietyLevel = state.fear + state.guilt; 
    const joyLevel = state.joy + state.pride; 

    const newWaveHeight = 100 + joyLevel * 50; 
    compoundWave2.style.backgroundSize = `50% ${newWaveHeight}px`;

    const newWaveSpeed = 7 - anxietyLevel * 3; 
    compoundWave2.style.animationDuration = `${newWaveSpeed.toFixed(1)}s, 7s`;
}

function startScanner() {
    scannerOverlay.style.display = 'flex';
    scannerOverlay.classList.add('scanner-active');
    
    setTimeout(() => {
        scannerOverlay.classList.remove('scanner-active');
        setTimeout(() => {
            scannerOverlay.style.display = 'none';
        }, 50); 
    }, 1500);
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
    startScanner(); 

    try {
        
        // **محاكاة الرد (بيانات AI صحيحة)**
        const fakeResponseText = "تم تحليل النص. حالة المشاعر الداخلية للذكاء الاصطناعي تظهر اضطراباً في الأمواج الكمومية بسبب تناقض البيانات المدخلة. يرجى إعادة الصياغة للحصول على انسياب مائي كامل.";

        // **محاكاة بيانات القياسات المعقدة (للتجربة)**
        const simulatedState = {
            guilt: 0.8, 
            pride: 0.1,
            fear: 0.5, 
            joy: 0.2
        };
        const simulatedLambda = 0.15; // قيمة منخفضة تدل على الاضطراب

        // انتظار انتهاء المسح الضوئي قبل عرض الرد
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        
        displayMessage('ai', fakeResponseText);
        
        // تطبيق التحديثات المرئية الجديدة
        updateEmotionVisuals(simulatedState); 
        updateMentalState(simulatedLambda); 

    } catch (error) {
        displayMessage('error', `إخفاق مائي! فشل في إنشاء البيانات المدققة: ${error.message}`);
    } finally {
        userInput.disabled = false;
        sendButton.disabled = false;
        setRobotThinking(false); 
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
    setRobotThinking(false); 
    startGreetingAnimation();
    
    // تعيين حالة بصرية أولية هادئة
    updateEmotionVisuals({ guilt: 0, pride: 0, fear: 0, joy: 0 }); 
    updateMentalState(0.50);

    // الروبوت مرئي وثابت دائماً (V30)
    robotSentinel.classList.remove('fab-robot-hidden'); 
    robotSentinel.classList.add('fab-robot-visible'); 
});
