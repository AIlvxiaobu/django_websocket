# coding=utf8
from django.contrib.auth.models import User
from django.db import models


class ProfileBase(type):
    def __new__(cls, name, bases, attrs):
        module = attrs.pop('__module__')

        parents = [b for b in bases if isinstance(b, ProfileBase)]

        if parents:
            fields = []
            for obj_name, obj in attrs.items():
                if isinstance(obj, models.Field): fields.append(obj_name)
                User.add_to_class(obj_name, obj)
        return super(ProfileBase, cls).__new__(cls, name, bases, attrs)


class ProfileUser(object):
    __metaclass__ = ProfileBase


class MyProfile(ProfileUser):
    """
    功能说明:auth_user 扩展属性
    """
    phone_number = models.CharField(max_length=11)  # 手机号
    data_power = models.IntegerField(default=0)  # 数据权限，0、一般用户 1、省管理员 2、市管理员 3、县区管理员 4、学校管理员
    logins = models.IntegerField(default=1)  # 登录次数
    role_code = models.CharField(max_length=10, default='')  # 角色
    add_user = models.CharField(max_length=20, db_index=True, default='')  # 添加用户

    class Meta:
        db_table = 'auth_user'
