import json
from collections import deque
from typing import Dict, Any, List

class EmotionalState:
    """
    يدير الحالة العاطفية والتاريخية والمفاهيم المعرفية للمستخدم.
    * تم تعديله لاستخدام الذاكرة الداخلية بدلاً من SQLite ليتناسب مع بيئات Serverless (Netlify).
    * إضافة: تخزين نواة السرد (Narrative Focus) والفجوة المعرفية (Cognitive Gap).
    """

    BASE_EMOTIONS = {"guilt": 0.0, "fear": 0.0, "sadness": 0.0, "joy": 0.0, "anger": 0.0}
    
    def __init__(self, history_size: int = 5):
        # الحالة العاطفية الحالية
        self.current_state: Dict[str, float] = self.BASE_EMOTIONS.copy()
        # سجل تاريخ آخر N من الحالات (لتحليل السياق)
        self.history: deque[Dict[str, float]] = deque(maxlen=history_size)
        
        # الميزات الجديدة لتتبع السياق
        self.narrative_focus: str = "غير محدد."  # لب المشكلة (مثل "الطرد من العمل")
        self.cognitive_gap: float = 0.0          # قيمة التناقض المعرفي [0.0 - 1.0]

    def to_dict(self) -> Dict[str, Any]:
        """إرجاع حالة الوعي كقاموس كامل لحفظها أو نقلها."""
        return {
            "current_state": self.current_state,
            "history": list(self.history),
            "narrative_focus": self.narrative_focus,
            "cognitive_gap": self.cognitive_gap
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'EmotionalState':
        """إنشاء كائن من قاموس مُخزّن (مهم لإدارة الحالة في الـ API)."""
        state = cls()
        state.current_state = data.get("current_state", state.BASE_EMOTIONS.copy())
        state.history = deque(data.get("history", []), maxlen=state.history.maxlen)
        state.narrative_focus = data.get("narrative_focus", "غير محدد.")
        state.cognitive_gap = data.get("cognitive_gap", 0.0)
        return state

    def update_state(self, new_data: Dict[str, Any]):
        """تحديث الحالة العاطفية والمعرفية معاً."""
        
        # 1. تحديث التاريخ العاطفي
        self.history.append(self.current_state.copy())
        
        # 2. تحديث المشاعر (متوسط مرجح 60/40 لصالح الإحساس الجديد)
        new_emotions = new_data.get("emotions", {})
        for emotion, value in new_emotions.items():
            if emotion in self.current_state:
                self.current_state[emotion] = (self.current_state[emotion] * 0.4) + (value * 0.6)
            
        # 3. تحديث البيانات المعرفية
        if new_data.get("narrative_focus"):
            self.narrative_focus = new_data["narrative_focus"]
        self.cognitive_gap = max(0.0, min(1.0, new_data.get("cognitive_gap", self.cognitive_gap)))

    def get_emotional_history_summary(self) -> str:
        """يُرجع ملخصاً لتغير المشاعر الرئيسية لـ PromptBuilder."""
        if len(self.history) < 2:
            return "التاريخ قصير، لا يمكن تحديد الاتجاه."
        
        latest = self.current_state
        initial = self.history[0]
        summary = ""
        for emotion in ["guilt", "fear", "sadness"]:
            diff = latest.get(emotion, 0.0) - initial.get(emotion, 0.0)
            if abs(diff) > 0.15: 
                trend = "تصاعد قوي" if diff > 0 else "تنازل ملحوظ"
                summary += f"- {emotion}: {trend}.\n"
        
        return summary if summary else "لا يوجد تغير عاطفي ملحوظ في المشاعر السلبية."
