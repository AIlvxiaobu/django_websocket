import json
import time

from channels.generic.websocket import AsyncWebsocketConsumer


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # 连接到房间时触发方法
        self.room_group_name = 'cms_room'
        # 一个链接（channel）创建时，通过group_add将channel添加到Group中，
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # 关闭连接
        # 链接关闭通过group_discard将channel从Group中剔除，
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = str(self.scope["user"]) + '在' + time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()) +'说：' + text_data_json['message']
        # Send message to room group 收到消息时可以调用group_send方法将消息发送到Group，这个Group内所有的channel都可以收的到
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))
