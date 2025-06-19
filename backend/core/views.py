from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from .document_processor import DocumentProcessor
import logging

logger = logging.getLogger(__name__)

# Create your views here.

class ProcessDocumentView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            file = request.FILES.get('document')
            if not file:
                logger.error("No document provided in request")
                return Response({"error": "No document provided"}, status=400)
            
            logger.info(f"Processing file: {file.name}")
            file_content = file.read()
            
            processor = DocumentProcessor()
            secured_data = processor.secure_document(file_content)
            
            response = HttpResponse(
                secured_data,
                content_type='application/octet-stream'
            )
            response['Content-Disposition'] = f'attachment; filename=secured_{file.name}.encrypted'
            logger.info(f"Successfully secured file: {file.name}")
            return response
            
        except Exception as e:
            logger.error(f"Error in ProcessDocumentView: {str(e)}")
            return Response(
                {"error": "An error occurred while processing the document"},
                status=500
            )

class UnlockDocumentView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            file = request.FILES.get('document')
            if not file:
                logger.error("No document provided in request")
                return Response({"error": "No document provided"}, status=400)
            
            if not file.name.endswith('.encrypted'):
                logger.error(f"Invalid file type: {file.name}")
                return Response(
                    {"error": "File must have .encrypted extension"},
                    status=400
                )
            
            logger.info(f"Processing encrypted file: {file.name}")
            file_content = file.read()
            
            processor = DocumentProcessor()
            original_data = processor.unlock_document(file_content)
            
            original_name = file.name.replace('.encrypted', '')
            response = HttpResponse(
                original_data,
                content_type='application/octet-stream'
            )
            response['Content-Disposition'] = f'attachment; filename=unlocked_{original_name}'
            logger.info(f"Successfully unlocked file: {file.name}")
            return response
            
        except Exception as e:
            logger.error(f"Error in UnlockDocumentView: {str(e)}")
            return Response(
                {"error": "An error occurred while processing the document"},
                status=500
            )
