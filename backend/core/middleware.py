import jwt
from django.conf import settings
from django.http import JsonResponse
import requests
import logging

logger = logging.getLogger(__name__)

class ClerkAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Skip authentication for non-protected routes
        if request.path.startswith('/public'):
            return self.get_response(request)

        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            logger.warning('Missing or invalid Authorization header')
            return JsonResponse({'error': 'Unauthorized'}, status=401)

        token = auth_header.split(' ')[1]
        logger.info(f'Attempting to verify token: {token[:10]}...')
        
        try:
            # Get the session ID from the token
            session_id = jwt.decode(token, options={"verify_signature": False})['sid']
            logger.info(f'Session ID extracted: {session_id}')
            
            # Verify the session with Clerk
            response = requests.get(
                f'{settings.CLERK_API_URL}/sessions/{session_id}',
                headers={
                    'Authorization': f'Bearer {settings.CLERK_SECRET_KEY}',
                }
            )
            
            logger.info(f'Clerk API response status: {response.status_code}')
            if response.status_code != 200:
                logger.error(f'Clerk API error: {response.text}')
                return JsonResponse({'error': 'Invalid session'}, status=401)

            # Add user info to request
            request.clerk_user = response.json()
            return self.get_response(request)

        except Exception as e:
            logger.error(f'Authentication error: {str(e)}')
            return JsonResponse({'error': 'Authentication failed'}, status=401) 