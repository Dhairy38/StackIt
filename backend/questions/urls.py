from django.urls import path
from .views import QuestionListCreateView, vote_question

urlpatterns = [
    path('questions/', QuestionListCreateView.as_view(), name='questions'),
    path('questions/<int:pk>/vote/', vote_question, name='vote-question'),
]
