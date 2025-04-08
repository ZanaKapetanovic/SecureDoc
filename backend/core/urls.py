from django.urls import path
from .views import TaskListCreateView  # zamijeni sa stvarnim viewom
 
urlpatterns = [
    path('api/tasks/', TaskListCreateView.as_view(), name='task-list'),
]