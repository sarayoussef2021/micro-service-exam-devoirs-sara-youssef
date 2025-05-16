from typing import List, Optional
from uuid import UUID
from datetime import datetime
from pydantic import BaseModel, Field


# --- Exam ---

class ExamBase(BaseModel):
    teacher_id: UUID
    title: str
    description: Optional[str] = None
    format: str  # "upload" ou "questions"
    file_path: Optional[str] = None


class ExamCreate(ExamBase):
    pass


class Exam(ExamBase):
    exam_id: UUID
    created_at: datetime

    class Config:
        orm_mode = True


# --- Question ---

class QuestionBase(BaseModel):
    exam_id: UUID
    question_text: str
    options: List[str] = Field(default_factory=list)
    correct_option: int


class QuestionCreate(QuestionBase):
    pass


class Question(QuestionBase):
    question_id: UUID
    created_at: datetime

    class Config:
        orm_mode = True
