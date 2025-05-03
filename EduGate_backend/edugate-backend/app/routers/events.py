from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from ..fake_db import list_items, add_item, get_item, update_item, delete_item

router = APIRouter()
TABLE = "events"

class Event(BaseModel):
    title: str
    start: str
    end: str

class EventOut(Event):
    id: str

@router.get("/", response_model=List[EventOut])
def list_events():
    return list_items(TABLE)

@router.post("/", response_model=EventOut, status_code=201)
def create_event(ev: Event):
    return add_item(TABLE, ev.model_dump())

@router.get("/{event_id}", response_model=EventOut)
def get_event(event_id: str):
    e = get_item(TABLE, event_id)
    if not e: raise HTTPException(404)
    return e

@router.put("/{event_id}", response_model=EventOut)
def update_event(event_id: str, ev: Event):
    updated = update_item(TABLE, event_id, ev.model_dump())
    if not updated: raise HTTPException(404)
    return updated

@router.delete("/{event_id}", status_code=204)
def delete_event(event_id: str):
    delete_item(TABLE, event_id)
