from django.conf.urls import url
from apps.message import views

urlpatterns = [
    url(r'^send_message/$', views.send_message),  # 消息推送
]
