// **التعديل النهائي:** تم تعيين رابط API إلى خدمة Render المنشورة (مع إضافة المسار الصحيح).
const API_ENDPOINT = "https://oo-4.onrender.com/api/ask"; 
// تم تأكيد الرابط: https://oo-4.onrender.com/api/ask

// العناصر التي نعتمد عليها في تحديث الواجهة
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const typingIndicator = document.getElementById('typing-indicator');
const sendButton = document.getElementById('send-button');

/**
 * تحديث مستويات المشاعر و Lambda في لوحة القياس
 * @param {object} state - حالة المشاعر الجديدة (guilt, pride, fear, joy)
 * @param {number} lambda_val - قيمة الضمير Lambda الجديدة
 */
function updateEmotionalDisplay(state, lambda_val) {
    document.getElementById('guilt-level').textContent = state.guilt.toFixed(2);
    document.getElementById('pride-level').textContent = state.pride.toFixed(2);
    document.getElementById('fear-level').textContent = state.fear.toFixed(2);
    document.getElementById('joy-level').textContent = state.joy.toFixed(2);
    document.getElementById('lambda-level').textContent = lambda_val.toFixed(2);
}

/**
 * عرض رسالة جديدة في صندوق الدردشة
 * @param {string} sender - نوع المرسل ('user', 'ai', 'error')
 * @param {string} message - نص الرسالة
 */
function displayMessage(sender, message) {
    const msgElement = document.createElement('p');
    msgElement.className = sender;
    // التأكد من أن الرسائل تُضاف قبل مؤشر الكتابة (Typing Indicator)
    msgElement.innerHTML = `${sender === 'user' ? 'أنت' : 'الروبوت'}: <span>${message}</span>`;
    chatBox.insertBefore(msgElement, typingIndicator); 
    chatBox.scrollTop = chatBox.scrollHeight;
}

/**
 * إرسال الرسالة والتعامل مع استجابة الخادم
 */
async function sendMessage() {
    const prompt = userInput.value.trim();
    if (!prompt) return;

    displayMessage('user', prompt);
    userInput.value = '';

    // تعطيل الإدخال وإظهار مؤشر الكتابة
    userInput.disabled = true;
    sendButton.disabled = true;
    typingIndicator.style.display = 'flex';


    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // تمرير الـ prompt فقط، بافتراض أن user_tone سيتم تعيينه افتراضياً في الخادم
            body: JSON.stringify({ prompt: prompt }) 
        });

        if (!response.ok) {
            throw new Error(`خطأ: ${response.status} - فشل الاتصال بخدمة EEAI`);
        }

        const data = await response.json();
        
        // عرض رد الروبوت
        displayMessage('ai', data.response_text);
        
        // تحديث لوحة المشاعر و Lambda بناءً على رد الخادم
        updateEmotionalDisplay(data.new_state, data.lambda_value);

    } catch (error) {
        // رسالة الخطأ
        displayMessage('error', `حدث خطأ في الاتصال بالخدمة: ${error.message}`);
        console.error("Error communicating with API:", error);
    } finally {
        // إعادة تفعيل الإدخال وإخفاء مؤشر الكتابة في جميع الأحوال
        userInput.disabled = false;
        sendButton.disabled = false;
        typingIndicator.style.display = 'none';
    }
}

// تفعيل زر Enter للإرسال
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// تفعيل زر الإرسال بالنقر
sendButton.addEventListener('click', sendMessage);

