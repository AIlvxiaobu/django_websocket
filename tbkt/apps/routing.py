from apps.chat.consumers import ChatConsumer
from apps.message.consumers import MsgConsumer
from django.conf.urls import url

websocket_urlpatterns = [
    url('ws/chat/', ChatConsumer),
    url('ws/message/', MsgConsumer),
]