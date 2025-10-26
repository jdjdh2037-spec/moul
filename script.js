// **الكود المُطوَّر V16: الذكاء الاصطناعي الآلي الدقيق (Precision AI Automaton)**

// نقطة النهاية الوهمية لـ AI - يجب استبدالها بـ API حقيقي عند النشر الفعلي
const AI_API_ENDPOINT = "https://your-actual-ai-api.com/process"; 
// نستخدم نقطة نهاية المحاكاة القديمة لأغراض العرض التوضيحي
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

// عناصر ملء السائل (V13)
const hydroIconFill = document.getElementById('hydro-icon-fill');
const prideFill = document.getElementById('pride-fill');
const guiltFill = document.getElementById('guilt-fill');
const joyFill = document.getElementById('joy-fill');
const fearFill = document.getElementById('fear-fill');
const emotionFills = { pride: prideFill, guilt: guiltFill, joy: joyFill, fear: fearFill };

let currentHydroLevel = 0; 

// ===================================
// وظائف العرض والرسائل
// ===================================

function displayMessage(sender, message) {
    const msgElement = document.createElement('p');
    msgElement.className = sender;
    
    if (sender === 'ai' || sender === 'error') {
        // استخدم الأيقونات المناسبة
        const iconClass = sender === 'ai' ? 'fas fa-microchip' : 'fas fa-exclamation-triangle';
        msgElement.innerHTML = `<i class="${iconClass}"></i> <p>${message}</p>`;
    } else {
        msgElement.innerHTML = `<span>${message}</span>`;
    }

    const typingIndicator = document.getElementById('typing-indicator');
    chatBox.insertBefore(msgElement, typingIndicator); 
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ===================================
// وظائف التحكم في الروبوت وتفاعلاته (V14, V16)
// ===================================

function setRobotThinking(isThinking) {
    const typingIndicator = document.getElementById('typing-indicator');
    
    if (isThinking) {
        typingIndicator.style.display = 'flex'; 
        // التحول إلى وضع السائل (V14)
        robotSentinel.classList.add('thinking'); 
    } else {
        typingIndicator.style.display = 'none';
        // العودة إلى الهيكل الدقيق (V16)
        robotSentinel.classList.remove('thinking');
    }
}

function triggerAnswerGlare() {
    // توهج الشاشة لفترة وجيزة (V14)
    answerGlareOverlay.style.transition = 'opacity 0.1s ease-in';
    answerGlareOverlay.style.opacity = 0.4; 

    setTimeout(() => {
        answerGlareOverlay.style.transition = 'opacity 0.5s ease-out';
        answerGlareOverlay.style.opacity = 0;
    }, 200); 
}

function startWaveReaction() { 
    // تفاعل الموجة العنيف (V12)
    waveIllusion.style.animation = 'wave-clash 0.5s infinite ease-in-out'; 
}

function endWaveReaction() { 
    // إعادة الموجة لوضعها الطبيعي (V12)
    waveIllusion.style.animation = 'wave-clash 3s infinite ease-in-out'; 
}

function triggerRippleEffect() {
    // تأثير التموج على زر الإرسال (V13)
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
    document.head.appendChild(styleSheet);
    
    ripple.style.animation = 'none';
    ripple.offsetHeight; 
    ripple.style.animation = 'ripple-spread 0.5s ease-out';
}


// ===================================
// وظائف تحديث القياسات
// ===================================

function updateHydroLevel(changeAmount) {
    // تحديث شريط المعالجة والأيقونة العلوية (V13)
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
    // تحديث القيم النصية وملء السائل في أيقونات العواطف (V13)
    document.getElementById('guilt-level').textContent = state.guilt.toFixed(2);
    document.getElementById('pride-level').textContent = state.pride.toFixed(2);
    document.getElementById('fear-level').textContent = state.fear.toFixed(2);
    document.getElementById('joy-level').textContent = state.joy.toFixed(2);
    document.getElementById('lambda-level').textContent = lambda_val.toFixed(2);

    emotionFills.pride.style.height = `${state.pride * 100}%`;
    emotionFills.guilt.style.height = `${state.guilt * 100}%`;
    emotionFills.joy.style.height = `${state.joy * 100}%`;
    emotionFills.fear.style.height = `${state.fear * 100}%`;

    updateMentalState(lambda_val); 
}

function updateMentalState(lambda_val) {
    // تحديث حالة الروبوت (V16)
    let stateText = 'فحص دقيق V16';
    let stateColor = '#5a5a5a'; 

    if (lambda_val > 0.8) {
        stateText = 'توليف آلي';
        stateColor = '#2ecc71'; 
    } else if (lambda_val < 0.2) {
        stateText = 'صيانة ميكانيكية';
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
        // الربط بالـ API (يستخدم نقطة نهاية المحاكاة حاليًا)
        const response = await fetch(SIMULATION_API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: prompt }) 
        });

        if (!response.ok) {
            throw new Error(`خطأ ${response.status}: فشل في الفحص الدقيق لمصفوفة البيانات.`);
        }

        const data = await response.json();
        
        displayMessage('ai', data.response_text);
        updateEmotionalDisplay(data.new_state, data.lambda_value);
        updateHydroLevel(20); 

        triggerAnswerGlare(); 

    } catch (error) {
        displayMessage('error', `تحذير آلي! فشل في فحص البيانات الأساسية: ${error.message}`);
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

// تحديث مبدئي للواجهة عند التحميل (V15)
document.addEventListener('DOMContentLoaded', () => {
    const initialState = { guilt: 0.1, pride: 0.1, fear: 0.1, joy: 0.1 };
    const initialLambda = 0.50; 
    updateEmotionalDisplay(initialState, initialLambda);
    updateHydroLevel(0); 
    setRobotThinking(false); // التأكد من أن الروبوت يبدأ بهيكله الدقيق
});
