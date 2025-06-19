from django.urls import path
from .views import ProcessDocumentView, UnlockDocumentView

urlpatterns = [
    path('secure/', ProcessDocumentView.as_view(), name='secure-document'),
    path('unlock/', UnlockDocumentView.as_view(), name='unlock-document'),
] 