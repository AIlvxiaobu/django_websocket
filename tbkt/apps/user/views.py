from django.contrib import auth
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render
from django.contrib.auth.models import User


def login(request):
    """
    功能说明：登录验证
    ----------------------------------------------------
    修改人                修改时间                修改原因
    ----------------------------------------------------
    吕建威                2018-12-07
    ----------------------------------------------------
    备注: 登录验证
    """
    if request.method == "GET":
        return render(request, 'login.html')

    if request.method == "POST":
        # 获取参数
        username = request.POST.get('username') or ''
        password = request.POST.get('password') or ''
        print(username, password, sep='|')
        # 验证用户密码是否正确
        user = User.objects.get(username=username)
        if user:
            auth.login(request, user)
            return HttpResponseRedirect('/welcome/')
        else:
            return HttpResponse('密码错误')


def logout(request):
    """
    功能说明：退出登录
    """
    auth.logout(request)
    return HttpResponseRedirect('/login/')


def welcome(request):
    return render(request, 'welcome.html')