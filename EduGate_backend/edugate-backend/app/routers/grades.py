from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from ..fake_db import list_items, add_item

router = APIRouter()
TABLE = "grades"

class GradeIn(BaseModel):
    student: str
    subject: str
    type: str
    score: float

class GradeOut(GradeIn):
    id: str

@router.get("/", response_model=List[GradeOut])
def list_grades():
    return list_items(TABLE)

@router.post("/", response_model=GradeOut, status_code=201)
def create_grade(g: GradeIn):
    return add_item(TABLE, g.model_dump())
