// **الكود المُطوَّر V6: المتغير العاطفي الشفاف ومرآة الصدى العاطفي**

const API_ENDPOINT = "https://oo-4.onrender.com/api/ask"; 

// العناصر الأساسية
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const robotSentinel = document.getElementById('robot-sentinel');
const dynamicCore = document.querySelector('.dynamic-core'); // جوهر الروبوت (لتغيير الشكل)
const robotStatus = document.getElementById('robot-status');
const container = document.getElementById('main-container');

// ===================================
// وظائف واجهة المستخدم الأساسية
// ===================================

function updateEmotionalDisplay(state, lambda_val) {
    // ... (هذه الدالة تبقى كما هي لتحديث الأرقام والمؤشرات)
    document.getElementById('guilt-level').textContent = state.guilt.toFixed(2);
    document.getElementById('pride-level').textContent = state.pride.toFixed(2);
    document.getElementById('fear-level').textContent = state.fear.toFixed(2);
    document.getElementById('joy-level').textContent = state.joy.toFixed(2);
    document.getElementById('lambda-level').textContent = lambda_val.toFixed(2);
    
    // ===========================================
    // ابتكار V6 (أ): تغيير شكل الروبوت بناءً على العاطفة المهيمنة
    // ===========================================
    
    const emotions = [
        { name: 'pride', value: state.pride, shape: 'star', color: '#2ecc71' },
        { name: 'guilt', value: state.guilt, shape: 'cube', color: '#e74c3c' },
        { name: 'joy', value: state.joy, shape: 'pyramid', color: '#f1c40f' },
        { name: 'fear', value: state.fear, shape: 'sphere', color: '#3498db' }
    ];

    // تحديد العاطفة المهيمنة
    emotions.sort((a, b) => b.value - a.value);
    const dominant = emotions[0];
    
    // تطبيق الشكل واللون الجديد (يفترض أن CSS لديك يتعرف على الفئات)
    dynamicCore.className = `dynamic-core ${dominant.shape}`;
    dynamicCore.style.boxShadow = `0 0 50px ${dominant.color}`;

    // تحديث حالة الروبوت
    robotStatus.textContent = `يتجسد: ${dominant.name} (${dominant.value.toFixed(2)})`;
    robotStatus.style.backgroundColor = dominant.color;
}

function displayMessage(sender, message, emotion_data = null) {
    const msgElement = document.createElement('p');
    msgElement.className = sender;
    
    if (sender === 'ai') {
        msgElement.innerHTML = `<i class="fas fa-wave-square"></i> <p>${message}</p>`;
    } else {
        // رسالة المستخدم مع بيانات التحليل الفوري
        let emotionBadge = '';
        if (emotion_data && emotion_data.dominant) {
            emotionBadge = `
                <span class="user-emotion-badge" style="color: ${emotion_data.color}; border-color: ${emotion_data.color};">
                    ${emotion_data.dominant.charAt(0).toUpperCase()} (${emotion_data.score.toFixed(2)})
                </span>
            `;
        }
        msgElement.innerHTML = `${emotionBadge} <span>${message}</span>`;
    }

    chatBox.insertBefore(msgElement, document.getElementById('typing-indicator')); 
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ===================================
// ابتكار V6 (ب): مرآة الصدى العاطفي (تحليل رسالة المستخدم فورياً)
// ===================================

const EMOTION_THRESHOLD = 0.25; // عتبة لتحديد ما إذا كانت العاطفة واضحة

function analyzeUserMessage(prompt) {
    // **ملاحظة:** بما أننا لا نستطيع إجراء تحليل حقيقي للنص في المتصفح، 
    // سنستخدم محاكاة بسيطة تعتمد على الكلمات المفتاحية
    let analysis = { dominant: 'None', score: 0.0, color: '#ccc' };

    if (prompt.includes('سعيد') || prompt.includes('جميل') || prompt.includes('رائع')) {
        analysis.dominant = 'Joy';
        analysis.score = Math.random() * 0.5 + 0.5; // 0.5 - 1.0
        analysis.color = '#f1c40f'; // Joy Color
    } else if (prompt.includes('خائف') || prompt.includes('قلق') || prompt.includes('سيئ')) {
        analysis.dominant = 'Fear';
        analysis.score = Math.random() * 0.5 + 0.5;
        analysis.color = '#e74c3c'; // Fear Color
    } else if (prompt.includes('فخور') || prompt.includes('أنجزت')) {
        analysis.dominant = 'Pride';
        analysis.score = Math.random() * 0.5 + 0.5;
        analysis.color = '#2ecc71'; // Pride Color
    }
    
    return analysis.score > EMOTION_THRESHOLD ? analysis : null;
}

function showEchoEffect(analysis) {
    if (!analysis) return;
    
    // عرض مؤشر بصري عائم على حقل الإدخال
    let echoElement = document.querySelector('.echo-feedback');
    if (!echoElement) {
        echoElement = document.createElement('div');
        echoElement.className = 'echo-feedback';
        userInput.parentNode.appendChild(echoElement);
    }
    
    echoElement.style.borderColor = analysis.color;
    echoElement.textContent = `صدى العاطفة: ${analysis.dominant}`;
    echoElement.style.opacity = 1;
    
    setTimeout(() => {
        echoElement.style.opacity = 0;
    }, 1500);
}

// ===================================
// منطق معالجة الإدخال
// ===================================

userInput.addEventListener('input', () => {
    const prompt = userInput.value.trim();
    const analysis = analyzeUserMessage(prompt);
    showEchoEffect(analysis);
});


// ===================================
// وظيفة الإرسال الرئيسية (مُعدَّلة لدمج التحليل الفوري)
// ===================================

async function sendMessage() {
    const prompt = userInput.value.trim();
    if (!prompt) return;

    // 1. تحليل رسالة المستخدم قبل الإرسال (مرآة الصدى)
    const userEmotionAnalysis = analyzeUserMessage(prompt);

    displayMessage('user', prompt, userEmotionAnalysis); // عرض الرسالة مع المؤشر العاطفي
    userInput.value = '';

    userInput.disabled = true;
    sendButton.disabled = true;
    
    setRobotThinking(true); 
    // تطبيق تأثير الاضطراب
    container.style.transform = `translateX(${Math.random() * 1.5 - 0.75}px) translateY(${Math.random() * 1.5 - 0.75}px)`;
    setTimeout(() => { container.style.transform = 'none'; }, 100);

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: prompt }) 
        });

        if (!response.ok) {
            throw new Error(`خطأ ${response.status}: فشل اتصال النظام العاطفي.`);
        }

        const data = await response.json();
        
        displayMessage('ai', data.response_text);
        updateEmotionalDisplay(data.new_state, data.lambda_value);

    } catch (error) {
        displayMessage('error', `إنذار! اضطراب في الاتصال: ${error.message}`);
        console.error("Error communicating with API:", error);
    } finally {
        userInput.disabled = false;
        sendButton.disabled = false;
        setRobotThinking(false); 
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

/*
    *** ملاحظات CSS (للتنفيذ الأمثل): ***

    1.  **الروبوت (Dynamic Shifter):**
        يجب أن يحتوي dynamic-core على فئات مثل .cube، .sphere، .pyramid، .star، وكل منها يجب أن يطبق أشكال ثلاثية الأبعاد باستخدام CSS.
        مثال: .dynamic-core.cube { transform: rotateX(45deg) rotateY(45deg); ... }

    2.  **مرآة الصدى العاطفي:**
        يجب إضافة تنسيق للعناصر الجديدة:
        .echo-feedback {
            position: absolute;
            top: -30px; 
            right: 0;
            padding: 5px 10px;
            font-size: 0.75rem;
            color: white;
            background: rgba(0,0,0,0.7);
            border-radius: 5px;
            border: 1px solid;
            transition: opacity 0.5s;
            pointer-events: none;
            z-index: 20;
        }

    3.  **مؤشر رسالة المستخدم:**
        يجب إضافة تنسيق للمؤشر العاطفي الصغير فوق رسالة المستخدم:
        .user-emotion-badge {
            display: inline-block;
            margin-left: 5px;
            padding: 2px 5px;
            font-size: 0.7rem;
            border-radius: 5px;
            border: 1px solid;
            background: rgba(255, 255, 255, 0.9);
            font-weight: bold;
        }
*/
