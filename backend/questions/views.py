from rest_framework import generics
from .serializers import QuestionSerializer
from django.contrib.auth.models import User

from .models import Question, QuestionVote
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def vote_question(request, pk):
    try:
        question = Question.objects.get(pk=pk)
    except Question.DoesNotExist:
        return Response({'error': 'Question not found'}, status=404)

    user = request.user
    action = request.data.get('action')

    if action not in ['upvote', 'downvote']:
        return Response({'error': 'Invalid action'}, status=400)

    vote_value = 1 if action == 'upvote' else -1

    # check if user already voted
    vote, created = QuestionVote.objects.get_or_create(user=user, question=question)

    if not created:
        # User already voted, update only if value changed
        if vote.value == vote_value:
            return Response({'message': 'You already voted this way', 'votes': question.votes})
        else:
            question.votes -= vote.value  # remove old vote
            vote.value = vote_value
            vote.save()
    else:
        vote.value = vote_value
        vote.save()

    question.votes += vote_value
    question.save()

    return Response({'votes': question.votes})

@api_view(['POST'])
def vote_question(request, pk):
    try:
        question = Question.objects.get(pk=pk)
    except Question.DoesNotExist:
        return Response({'error': 'Question not found'}, status=status.HTTP_404_NOT_FOUND)

    action = request.data.get('action')
    if action == 'upvote':
        question.votes += 1
    elif action == 'downvote':
        question.votes -= 1
    else:
        return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)

    question.save()
    return Response({'votes': question.votes})


class QuestionListCreateView(generics.ListCreateAPIView):
    queryset = Question.objects.all().order_by('-created_at')
    serializer_class = QuestionSerializer
    permission_classes = []  # allow anonymous for now

    def perform_create(self, serializer):
        default_user = User.objects.first()
        serializer.save(user=default_user)
