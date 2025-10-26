from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict, Optional, Any

# استيراد الوحدات المطورة
from EmotionalProcessorV4 import EmotionalProcessorV4
from EmotionalState import EmotionalState
from PromptBuilder import PromptBuilder
from CoreLLM import generate_llm_response # تم تصحيح الاستدعاء

# --- تهيئة المكونات (يتم تحميل النموذج مرة واحدة عند بدء التطبيق) ---
app = FastAPI(title="Cognitive Emotional AI", version="2.0.0")

# تهيئة المعالجات
processor = EmotionalProcessorV4()
builder = PromptBuilder()

# مخزن لحالات المستخدمين (يجب استبداله بقاعدة بيانات في الإنتاج)
user_states: Dict[str, EmotionalState] = {}

# نموذج البيانات لطلب الدردشة
class ChatRequest(BaseModel):
    user_id: str
    user_prompt: str
    current_state: Optional[Dict[str, Any]] = None

# نموذج البيانات للاستجابة
class ChatResponse(BaseModel):
    response_text: str
    new_state: Dict[str, Any]

@app.get("/")
def home():
    """للتحقق من أن الـ API قيد التشغيل."""
    return {"status": "ok", "message": "Cognitive Emotional AI V2.0 is running."}

@app.post("/chat", response_model=ChatResponse)
async def process_chat(request: ChatRequest):
    """المعالجة الرئيسية للدردشة."""
    
    # 1. إدارة الحالة (استرداد الحالة القديمة أو إنشاء حالة جديدة)
    if request.user_id not in user_states:
        state_manager = EmotionalState()
    elif request.current_state:
        state_manager = EmotionalState.from_dict(request.current_state)
    else:
        state_manager = user_states.get(request.user_id, EmotionalState()) # استخدام get لمنع الخطأ إذا لم يكن ID موجود

    try:
        # 2. تحليل المشاعر والمقاييس المعرفية
        processing_results = processor.process_text(request.user_prompt)
        
        # 3. تحديث الحالة العاطفية والمعرفية (يتم حفظ التاريخ والنواة هنا)
        state_manager.update_state(processing_results)
        
        # 4. بناء الأمر النهائي باستخدام الاستراتيجية الجديدة
        final_prompt = builder.build_prompt(request.user_prompt, state_manager)
        
        # 5. توليد الرد
        llm_response = generate_llm_response(final_prompt)
        
        # 6. حفظ الحالة
        user_states[request.user_id] = state_manager

        return ChatResponse(
            response_text=llm_response,
            new_state=state_manager.to_dict()
        )

    except Exception as e:
        return ChatResponse(
            response_text=f"خطأ: فشل في معالجة النموذج. {e}",
            new_state=state_manager.to_dict()
        )
