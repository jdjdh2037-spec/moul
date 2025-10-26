// **الكود المُطوَّر V28: الذبذبة العاطفية واللزوجة**

// ===================================
// إعدادات API (تذكير: تحتاج إلى API حقيقي لـ Gemini)
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
const mentalStateDisplay = document.getElementById('mental-state'); 
const nanoArm = document.getElementById('nano-arm'); 
const compoundWave1 = document.getElementById('compound-wave-1'); // الموجة الخلفية
const compoundWave2 = document.getElementById('compound-wave-2'); // الموجة الأمامية

// الألوان المحددة في CSS لربطها بـ JS
const EMOTION_COLORS = {
    calm: '#1abc9c',
    stress: '#e74c3c',
    joy: '#f1c40f',
    fear: '#9b59b6'
};

let isMobile = window.innerWidth <= 768;
let lastScrollTop = 0;
let scrollTimer = null;

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
        nanoArm.style.animation = 'wave-greeting 2s infinite ease-in-out alternate';
    }
}

function updateMentalState(lambda_val) {
    let stateText = 'تحليل اللزوجة V28';
    let stateColor = EMOTION_COLORS.calm;

    if (lambda_val > 0.8) {
        stateText = 'انسياب كمومي كامل';
        stateColor = EMOTION_COLORS.joy;
    } else if (lambda_val < 0.2) {
        stateText = 'اضطراب في الأمواج الكمومية';
        stateColor = EMOTION_COLORS.fear;
    } 
    
    if (mentalStateDisplay) {
        mentalStateDisplay.textContent = stateText;
        mentalStateDisplay.style.backgroundColor = stateColor;
    }
}

// ===================================
// وظائف التحكم في المشاعر والتمثيل البصري (V28)
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

    // ربط الشدة بحجم الـ shadow
    const shadowSize = Math.min(40, emotionalIntensity * 25); 
    emotionHalo.style.boxShadow = `0 0 ${shadowSize}px ${haloColor}, 0 0 ${shadowSize * 1.5}px ${haloColor} inset`;
    
    // 2. تغير مادة الروبوت (اللزوجة)
    if (totalNegative > totalPositive * 1.5) { // إذا كانت السلبية أعلى بكثير
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
    const anxietyLevel = state.fear + state.guilt; // يمثل التردد (السرعة)
    const joyLevel = state.joy + state.pride; // يمثل الارتفاع (Amplitude)

    // تغيير ارتفاع الموجة الأمامية (background-size: height)
    const newWaveHeight = 100 + joyLevel * 50; 
    compoundWave2.style.backgroundSize = `50% ${newWaveHeight}px`;

    // تغيير سرعة الموجة بناءً على القلق/التوتر (Frequency)
    const newWaveSpeed = 7 - anxietyLevel * 3; // من 7 ثواني (هادئ) إلى 4 ثواني (سريع)
    compoundWave2.style.animationDuration = `${newWaveSpeed.toFixed(1)}s, 7s`;
}

// ------------------------------------
// وظيفة المسح الضوئي (الروبوت البصاص)
// ------------------------------------
function startScanner() {
    scannerOverlay.style.display = 'flex';
    scannerOverlay.classList.add('scanner-active');
    
    // إزالة شاشة المسح بعد 1.5 ثانية (مدة الأنميشن)
    setTimeout(() => {
        scannerOverlay.classList.remove('scanner-active');
        // تأخير بسيط للتأكد من انتهاء الأنميشن قبل إخفائه
        setTimeout(() => {
            scannerOverlay.style.display = 'none';
        }, 50); 
    }, 1500);
}

// ------------------------------------
// وظائف FAB Logic والتموّج السريع (من V27)
// ------------------------------------

function handleRobotFAB() {
    if (!isMobile) return; 

    const st = window.pageYOffset || document.documentElement.scrollTop;
    
    if (st < lastScrollTop) { 
        robotSentinel.classList.add('fab-robot-visible');
        robotSentinel.classList.remove('fab-robot-hidden');
    } 
    else if (st > lastScrollTop && st > 50) {
        robotSentinel.classList.add('fab-robot-hidden');
        robotSentinel.classList.remove('fab-robot-visible');
    }
    
    lastScrollTop = st <= 0 ? 0 : st; 
}

function handleScrollRipple() {
    const currentTime = Date.now();
    const timeDiff = currentTime - lastScrollTime;
    
    if (timeDiff < 50) { 
        scrollRippleOverlay.classList.add('scroll-ripple-active');
        
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            scrollRippleOverlay.classList.remove('scroll-ripple-active');
        }, 300); 
    }

    lastScrollTime = currentTime;
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
    startScanner(); // تفعيل المسح البصاص عند الإرسال

    try {
        // **محاكاة الرد**
        const fakeResponseText = "تم تحليل النص. حالة المشاعر الداخلية للذكاء الاصطناعي تظهر اضطراباً في الأمواج الكمومية بسبب تناقض البيانات المدخلة. يرجى إعادة الصياغة للحصول على انسياب مائي كامل.";

        // **محاكاة بيانات القياسات المعقدة (للتجربة)**
        const simulatedState = {
            // محاكاة نتيجة سلبية عالية لـ اختبار الواجهة
            guilt: 0.8, 
            pride: 0.1,
            fear: 0.5, 
            joy: 0.2
        };
        const simulatedLambda = 0.15; // قيمة منخفضة

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

// إضافة مستمعي أحداث التمرير (V27/V28)
window.addEventListener('scroll', () => {
    handleRobotFAB(); 
    handleScrollRipple();
});

document.addEventListener('DOMContentLoaded', () => {
    setRobotThinking(false); 
    startGreetingAnimation();
    
    // تعيين حالة بصرية أولية هادئة
    updateEmotionVisuals({ guilt: 0, pride: 0, fear: 0, joy: 0 }); 
    updateMentalState(0.50);

    // التأكد من إخفاء الروبوت في البداية على الهاتف
    if (isMobile) {
        robotSentinel.classList.add('fab-robot-hidden');
    }
});

// تحديث متغير isMobile عند تغيير حجم النافذة
window.addEventListener('resize', () => {
    isMobile = window.innerWidth <= 768;
    if (!isMobile) {
        // إزالة تحكم FAB في وضع سطح المكتب
        robotSentinel.classList.remove('fab-robot-hidden');
        robotSentinel.classList.remove('fab-robot-visible');
    }
});
