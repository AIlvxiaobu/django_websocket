from django.conf.urls import url
from apps.user import views

urlpatterns = [
    url(r'^login/$', views.login),
    url(r'^logout/$', views.logout),
]
