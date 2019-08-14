import json

from channels.generic.websocket import AsyncWebsocketConsumer


class MsgConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        "加入全员消息推送"
        self.group_name = 'full_membership_message_push'
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def push_message(self, event):
        await self.send(text_data=json.dumps({
            "message": event['event']
        }))
