from django.urls import path
from .views import UserLoginView, UserDetailView, TaskViewSet
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('login/', UserLoginView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/', UserDetailView.as_view(), name='user_detail'),
    path('tasks', TaskViewSet.as_view({'post': 'create', 'get': 'list'})),
    path('tasks/<int:pk>', TaskViewSet.as_view({'put': 'update', 'get': 'retrieve'})),
]