from EmotionalState import EmotionalState
from typing import Dict, Any

class PromptBuilder:
    """
    يبني الأمر النهائي للنموذج اللغوي بناءً على استراتيجيات الرد المبتكرة.
    * الميزة الجديدة: اختيار استراتيجية رد (وجودية، عملية، ذاكرة) لتخصيص الاستجابة.
    """
    
    # 1. استراتيجية التعاطف الوجودي (تستخدم للذنب والتناقض)
    STRATEGY_EXISTENTIAL = "ابدأ ردك بمناقشة مفهوم المسؤولية المفرطة وتصحيح الذنب. يجب أن تكون فلسفياً ووجودياً. لا تقدم حلولاً مباشرة في الفقرة الأولى."
    # 2. استراتيجية التحليل العملي
    STRATEGY_ACTION = "ركز على تحويل الخوف إلى خطوات عمل صغيرة ومباشرة. تجاهل المشاعر وابدأ بخطة من 3 خطوات."
    # 3. استراتيجية الذاكرة العاطفية
    STRATEGY_MEMORY = "يجب أن تبدأ بالإشارة إلى التغيرات العاطفية في تاريخ المحادثة (من الملخص). ثم اربط هذه التغيرات بالسرد الحالي."

    def build_prompt(self, user_prompt: str, state_manager: EmotionalState) -> str:
        """ينشئ الأمر النهائي للنموذج اللغوي."""
        
        strategy = self._select_response_strategy(state_manager)
        
        emotional_context = ", ".join(
            [f"{emo}: {val:.2f}" for emo, val in state_manager.current_state.items() if val > 0.1]
        )
        history_summary = state_manager.get_emotional_history_summary()
        
        # 3. بناء توجيه النظام (System Guidance)
        system_guidance = (
            f"أنت مساعد محادثة عاطفي متخصص. مهمتك هي: {strategy}\n\n"
            f"--- بيانات السياق المعرفي ---\n"
            f"الرابط المعرفي للمشكلة: {state_manager.narrative_focus}\n"
            f"الفجوة المعرفية (التناقض بين الهدف والفشل): {state_manager.cognitive_gap:.2f}\n"
            f"الحالة العاطفية الحالية: {emotional_context}.\n"
            f"ملخص التاريخ العاطفي: {history_summary}\n"
            f"----------------------\n\n"
            f"رسالة المستخدم: {user_prompt}"
        )
        
        return system_guidance

    def _select_response_strategy(self, state: EmotionalState) -> str:
        """يختار الاستراتيجية الأفضل بناءً على مقاييس الحالة."""
        
        # الأولوية 1: التعاطف الوجودي (للذنب العالي والتناقض)
        if state.current_state.get("guilt", 0.0) >= 0.5 and state.cognitive_gap >= 0.7:
            return self.STRATEGY_EXISTENTIAL
            
        # الأولوية 2: استراتيجية الذاكرة (لتغير المشاعر المفاجئ)
        if "تصاعد قوي" in state.get_emotional_history_summary():
            return self.STRATEGY_MEMORY
        
        # الأولوية 3: التحليل العملي (للخوف أو القلق)
        if state.current_state.get("fear", 0.0) >= 0.5:
            return self.STRATEGY_ACTION
            
        return "استجب بشكل طبيعي وداعم، لكن ابدأ بتأكيد ما فهمته من مشاعر."
