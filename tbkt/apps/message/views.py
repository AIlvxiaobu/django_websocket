from asgiref.sync import async_to_sync
from django.http import HttpResponse
from channels.layers import get_channel_layer
from django.shortcuts import render


def send_message(request):
    if request.method == 'GET':
        return render(request, 'message/index.html')

    if request.method == 'POST':
        message = request.POST.get('msg')
        print('full_membership_message_push'.center(50, '*'))
        channel_layer = get_channel_layer()
        print(channel_layer)
        async_to_sync(channel_layer.group_send)(
            'full_membership_message_push',
            {
                "type": "push.message",
                "event": message
            }
        )
        return HttpResponse('消息已发送')
