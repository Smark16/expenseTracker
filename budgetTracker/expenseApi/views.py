from django.shortcuts import render
from .models import *
from .serializer import *
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
# Create your views here.
def cats(request):
    cats = Categories.objects.all()
    serializer = CatSerializer(cats, many=True)
    return JsonResponse(serializer.data, safe=False)

#get data
#serialize
#return json
@csrf_exempt
def user_login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(username=username, password=password)
    if user:     
        msg = {
            "bool":True,
            'user':user.username
        }
    else:
        msg = {
            'bool':False,
            'msg':'Please provide correct credentials!!'
        }
    return JsonResponse(msg)

@csrf_exempt
def user_register(request):
    first = request.POST.get('first')
    last = request.POST.get('last')
    username = request.POST.get('username')
    email = request.POST.get('email')
    password = request.POST.get('password')
    mobile = request.POST.get('mobile')

    user = User.objects.create(
        first_name = first,
        last_name = last,
        username = username,
        email = email
    )
    
    user.set_password(password)
    user.save() 

    if user:   
        newUser = UserAccounts.objects.create(
            user = user,
            mobile = mobile
        )   

        user_serializer = userSerilizer(newUser)

        msg = {
            'bool':True,
            'user':user.id,
            'newUser':user_serializer.data,
            'msg':'Registration successfull, You can now login'
        }
    else:
        msg = {
            'bool':False,
            'msg':'Please fill in al the credentials'
        }
    return JsonResponse(msg)