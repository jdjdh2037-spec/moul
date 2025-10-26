// **الكود المُطوَّر V32: المُطلق الكمومي**

// ===================================
// إعدادات API (تم إزالة المحاكاة - العودة للاتصال الأصلي)
// ===================================
const GEMINI_API_KEY = "AIzaSyBG0zkPOSCtRF34QClhP2Kn8Xep8b5_iNU"; // مفتاح وهمي
const SIMULATION_API_ENDPOINT = "https://oo-4.onrender.com/api/ask"; // نقطة النهاية الوهمية/الحقيقية للمستخدم

// ===================================
// عناصر الواجهة الرئيسية
// ===================================
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const robotSentinel = document.getElementById('robot-sentinel'); 
const emotionHalo = document.getElementById('emotion-halo');
const scannerOverlay = document.getElementById('scanner-overlay');
const lambdaLevelDisplay = document.getElementById('lambda-level'); 
const botAntenna = document.getElementById('nano-arm'); 
const compoundWave1 = document.getElementById('compound-wave-1'); 
const compoundWave2 = document.getElementById('compound-wave-2'); 
const botShell = document.getElementById('bot-shell');

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
    
    if (isThinking) {
        typingIndicator.style.display = 'flex'; 
        robotSentinel.classList.add('thinking'); 
        if (botShell) botShell.style.animation = 'simple-bounce 0.8s infinite alternate';
        if (botAntenna) botAntenna.style.animation = 'none';
    } else {
        typingIndicator.style.display = 'none';
        robotSentinel.classList.remove('thinking');
        if (botShell) botShell.style.animation = 'none';
        startGreetingAnimation();
    }
}

function startGreetingAnimation() {
    if (botAntenna) {
        botAntenna.style.animation = 'none'; 
        botAntenna.offsetHeight; 
        botAntenna.style.animation = 'wave-greeting 2s infinite ease-in-out alternate';
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
// وظائف التحكم في المشاعر والتمثيل البصري (V32)
// ===================================

function updateEmotionVisuals(state) {
    const totalPositive = state.pride + state.joy;
    const totalNegative = state.guilt + state.fear;
    const emotionalIntensity = totalPositive + totalNegative; 
    
    let haloColor = EMOTION_COLORS.calm;
    if (totalPositive > totalNegative) {
        haloColor = EMOTION_COLORS.joy;
    } else if (totalNegative > 0.5) {
        haloColor = EMOTION_COLORS.stress;
    }

    const shadowSize = Math.min(40, emotionalIntensity * 25); 
    emotionHalo.style.boxShadow = `0 0 ${shadowSize}px ${haloColor}, 0 0 ${shadowSize * 1.5}px ${haloColor} inset`;
    
    if (totalNegative > 1.0) { 
        document.body.classList.add('screen-disturb');
    } else {
        document.body.classList.remove('screen-disturb');
    }

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
// وظيفة الإرسال الرئيسية (استعادة الاتصال الأصلي)
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
        
        // **العودة إلى الاتصال الحقيقي (المفترض) بنقطة النهاية**
        const response = await fetch(SIMULATION_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: prompt, apiKey: GEMINI_API_KEY })
        });

        if (!response.ok) {
            throw new Error(`خطأ في نقطة النهاية: ${response.status}`);
        }

        const data = await response.json();
        
        // **يجب أن ترجع نقطة النهاية البيانات بهذا التنسيق:**
        // { responseText: "...", state: { guilt: 0.1, pride: 0.8, fear: 0.1, joy: 0.2 }, lambda: 0.5 }

        const apiResponseText = data.responseText || "لم يتم تلقي رد نصي، جاري تحليل الحالة العاطفية فقط.";
        const emotionalState = data.state || { guilt: 0.0, pride: 0.0, fear: 0.0, joy: 0.0 };
        const lambdaValue = data.lambda !== undefined ? data.lambda : 0.50;

        // انتظار انتهاء المسح الضوئي قبل عرض الرد
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        
        displayMessage('ai', apiResponseText);
        
        updateEmotionVisuals(emotionalState); 
        updateMentalState(lambdaValue); 

    } catch (error) {
        // إذا فشل الاتصال، يتم استخدام حالة افتراضية للرسالة المرئية
        displayMessage('error', `إخفاق مائي! فشل في الاتصال بالشبكة: ${error.message}.`);
        updateEmotionVisuals({ guilt: 0.5, pride: 0.0, fear: 0.5, joy: 0.0 });
        updateMentalState(0.05); // حالة اضطراب
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
    
    updateEmotionVisuals({ guilt: 0, pride: 0, fear: 0, joy: 0 }); 
    updateMentalState(0.50);

    robotSentinel.classList.remove('fab-robot-hidden'); 
    robotSentinel.classList.add('fab-robot-visible'); 
});
