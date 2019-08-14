from django.conf.urls import url
from apps.chat import views

urlpatterns = [
    url(r'^test/$', views.test),
    url(r'^chat/$', views.chat),
]
