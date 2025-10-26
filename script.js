// **الكود المُطوَّر V5.1: الكيان الودود والمحاكي العاطفي (مع حيلة البيانات الوهمية)**

// تم تعطيل الرابط الحقيقي مؤقتًا لاستخدام بيانات وهمية
const API_ENDPOINT = "MOCK_DATA_ACTIVE"; 

// العناصر الأساسية (كما هي)
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const robotSentinel = document.getElementById('robot-sentinel');
const energyPulsar = document.querySelector('.energy-pulsar');
const robotStatus = document.getElementById('robot-status');
const container = document.getElementById('main-container');
const robotMoodIcon = document.getElementById('robot-mood-icon');

// ===================================
// وظيفة محاكاة استجابة الـ API الوهمية (الحيلة)
// ===================================
function mockApiResponse(prompt) {
    return new Promise(resolve => {
        // تقليد وقت المعالجة لتبدو واقعية
        setTimeout(() => {
            
            // 1. توليد قيمة Lambda عشوائية
            const randomLambda = Math.random(); // بين 0 و 1

            let responseText;
            let joy = 0.0;
            let fear = 0.0;
            let pride = 0.0;
            let guilt = 0.0;

            if (randomLambda > 0.75) {
                // حالة فرح/فخر (رد إيجابي)
                responseText = "تم تحليل استفسارك بنجاح وبتوازن عاطفي مرتفع. تظهر النتائج أن النظام في حالة مثلى من الفعالية.";
                joy = randomLambda * 0.8; 
                pride = randomLambda * 0.7;
            } else if (randomLambda < 0.25) {
                // حالة خوف/ذنب (رد سلبي/محذر)
                responseText = "تم تسجيل اضطراب في تحليل البيانات. يُرجى مراجعة المدخلات لتقليل الضغط العاطفي على النظام.";
                fear = (1 - randomLambda) * 0.8;
                guilt = (1 - randomLambda) * 0.7;
            } else {
                // حالة حيادية
                responseText = "تمت المعالجة القياسية. الرد وظيفي ومحايد. يرجى المتابعة باستفساراتك.";
                joy = 0.15;
                pride = 0.15;
                fear = 0.15;
                guilt = 0.15;
            }
            
            // تهيئة بيانات الاستجابة كما لو كانت قادمة من الخادم
            const mockData = {
                response_text: responseText,
                lambda_value: randomLambda,
                new_state: {
                    joy: joy,
                    fear: fear,
                    pride: pride,
                    guilt: guilt
                }
            };

            resolve(mockData);

        }, 1500); // انتظار 1.5 ثانية
    });
}

// ===================================
// ... (بقية وظائف واجهة المستخدم كما هي)
// ...

function updateRobotMood(lambda_val) {
    // ... (هذه الوظيفة تبقى كما هي)
    robotSentinel.classList.remove('happy', 'sad', 'thinking');

    if (lambda_val > 0.75) {
        robotSentinel.classList.add('happy');
        robotMoodIcon.className = 'fas fa-smile robot-mood-icon'; 
        robotStatus.textContent = "طاقة مرتفعة / إيجابية";
        robotStatus.style.backgroundColor = '#2ecc71'; 
    } else if (lambda_val < 0.25) {
        robotSentinel.classList.add('sad');
        robotMoodIcon.className = 'fas fa-frown-open robot-mood-icon'; 
        robotStatus.textContent = "تحليل عميق / ضغط عاطفي";
        robotStatus.style.backgroundColor = '#e74c3c'; 
    } else {
        robotMoodIcon.className = 'fas fa-robot robot-mood-icon'; 
        robotStatus.textContent = "اتصال مستقر";
        robotStatus.style.backgroundColor = '#3498db'; 
    }
}

function updateEmotionalDisplay(state, lambda_val) {
    // ... (هذه الوظيفة تبقى كما هي)
    document.getElementById('guilt-level').textContent = state.guilt.toFixed(2);
    document.getElementById('pride-level').textContent = state.pride.toFixed(2);
    document.getElementById('fear-level').textContent = state.fear.toFixed(2);
    document.getElementById('joy-level').textContent = state.joy.toFixed(2);
    document.getElementById('lambda-level').textContent = lambda_val.toFixed(2);

    updateRobotMood(lambda_val);
    
    const emotionVariance = Math.abs(lambda_val - 0.5);
    const scaleFactor = 1.0 + (emotionVariance * 0.5);

    energyPulsar.style.transform = `scale(${scaleFactor})`;
}

// ... (بقية وظائف setRobotThinking و applyGlitchEffect كما هي)
// ...

// ===================================
// وظيفة الإرسال الرئيسية (مُعدَّلة للعمل بالبيانات الوهمية)
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
        
        // **!!! الحيلة البرمجية هنا !!!**
        // استبدلنا طلب Fetch الخارجي بوظيفة المحاكاة الداخلية
        const data = await mockApiResponse(prompt); 
        // -----------------------------
        
        displayMessage('ai', data.response_text);
        updateEmotionalDisplay(data.new_state, data.lambda_value);

    } catch (error) {
        // هذا الجزء لن يتم تنفيذه في وضع المحاكاة، ولكنه مفيد لو أعدت تفعيل Fetch
        const lambdaValue = 0.2; 
        const initialState = { guilt: 0.5, pride: 0.0, fear: 0.5, joy: 0.0 };
        
        displayMessage('ai', `<i class="fas fa-exclamation-triangle"></i> إنذار: اضطراب في الاتصال. ${error.message}`);
        updateEmotionalDisplay(initialState, lambdaValue); 
        
        console.error("Error communicating with API:", error);
    } finally {
        userInput.disabled = false;
        sendButton.disabled = false;
        setRobotThinking(false); 
        userInput.focus(); 
    }
}

// ... (بقية تفعيل الإرسال وتحديث DOMContentLoaded كما هي)
