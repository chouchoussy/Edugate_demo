"""In-memory database for demo"""
from uuid import uuid4
from datetime import datetime, timedelta

def _sample_events():
    today = datetime.utcnow()
    return [
        {"id": "e1", "title": "Họp PH", "start": today.isoformat(), "end": (today+timedelta(hours=1)).isoformat()},
        {"id": "e2", "title": "Thi HK1", "start": (today+timedelta(days=3)).isoformat(),
         "end": (today+timedelta(days=3,hours=2)).isoformat()}
    ]

_db = {
    "users": [
        {
            "id": "u1",
            "email": "admin@edugate.vn",
            "password": "admin123",        # NEW
            "name": "Quản trị viên",
            "role": "ADMIN",
            "klass": None,
            "status": "ACTIVE",
        },
        {
            "id": "u2",
            "email": "teacher@edugate.vn",
            "password": "teacher123",
            "name": "Nguyễn Văn A",
            "role": "TEACHER",
            "klass": "12A1",
            "status": "ACTIVE",
        },
        {
            "id": "u3",
            "email": "student@edugate.vn",
            "password": "student123",
            "name": "Trần Thị C",
            "role": "STUDENT",
            "klass": "12A1",
            "status": "ACTIVE",
        },
        {
            "id": "u4",
            "email": "parent@edugate.vn",
            "password": "parent123",
            "name": "Phan Thị B",
            "role": "PARENT",
            "klass": "12A1",
            "status": "ACTIVE",
        },
    ],
    "events": _sample_events(),
    "petitions": [],
    "rewards": [],
    "grades": [],
    "roles": [
        {"id":"r1","name":"ADMIN"},{"id":"r2","name":"TEACHER"},{"id":"r3","name":"PARENT"},{"id":"r4","name":"STUDENT"}
    ]
}

def list_items(table):         return _db[table]
def get_item(table, _id):      return next((x for x in _db[table] if x["id"] == _id), None)
def add_item(table, data):
    data["id"] = data.get("id") or str(uuid4())
    _db[table].append(data)
    return data
def update_item(table, _id, data):
    old = get_item(table, _id)
    if not old: return None
    _db[table].remove(old)
    old.update(data)
    _db[table].append(old)
    return old
def delete_item(table, _id):
    _db[table][:] = [x for x in _db[table] if x["id"] != _id]
