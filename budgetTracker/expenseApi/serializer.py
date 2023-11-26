from .models import *
from rest_framework import serializers

class CatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ["id", "name"]
class userSerilizer(serializers.ModelSerializer):
    class Meta:
        model = UserAccounts
        fields = ['id', 'user', 'mobile']

