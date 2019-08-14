from django.http import HttpResponse
from django.shortcuts import render


def test(request):
    print(request)
    return HttpResponse('ok')


def chat(request):
    return render(request, 'chat/index.html')
