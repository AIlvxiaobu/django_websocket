# coding: utf-8
from django.conf.urls import url, include

urlpatterns = [
    url(r'', include('apps.chat.urls')),
    url(r'', include('apps.user.urls')),
    url(r'', include('apps.message.urls')),
]