# BACKEND
Bản backup fake lỡ không code kịp
## Cài đặt 
- cd EduGate_backend
- cd edugate-backend
- python -m venv venv && source venv/bin/activate   #Windows: venv\Scripts\activate
- pip install -r requirements.txt

### Chạy server
- uvicorn app.main:app --reload
- API lắng nghe tại http://localhost:8000


# FRONTEND
- cd EduGate_frontend
- cd edugate-frontend
- npm i          # hoặc pnpm / yarn
- npm run dev    # Vite sẽ mở http://localhost:5173

# DEMO
1. admin 
- admin@edugate.vn
- pass: admin123
2. teacher
- teacher@edugate.vn
- teacher123 
3. student
- student@edugate.vn
- student123 
4. parent
- parent@edugate.vn
- parent123
