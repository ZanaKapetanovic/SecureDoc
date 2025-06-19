# SecureDoc

A simple document security application that allows users to securely encrypt and decrypt documents.

## Setup

### Backend (Django)

1. Create and activate virtual environment:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run migrations:
```bash
python manage.py migrate
```

4. Start the server:
```bash
python manage.py runserver
```

### Frontend (React)

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

## Usage

1. Open http://localhost:5173 in your browser
2. Choose "Secure Document" to encrypt a file or "Unlock Document" to decrypt
3. Select your file and click the corresponding button
4. The processed file will be automatically downloaded

## Security Note

This is a simplified implementation for demonstration purposes. In a production environment, you would want to:
- Implement proper user authentication
- Use secure key exchange mechanisms
- Add rate limiting
- Implement additional security measures 