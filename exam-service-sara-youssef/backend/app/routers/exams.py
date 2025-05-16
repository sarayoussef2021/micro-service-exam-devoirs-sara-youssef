from fastapi import APIRouter, HTTPException
from models.schemas import ExamCreate
from models.database import create_exam
from uuid import UUID

router = APIRouter()

@router.post("/exams")
def create_new_exam(exam: ExamCreate):
    try:
        exam_id = create_exam(exam)
        return {"exam_id": exam_id, "message": "Examen créé avec succès"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
