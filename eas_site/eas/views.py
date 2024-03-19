from rest_framework.decorators import api_view
from rest_framework.response import Response
from .db import Database
from bson.json_util import dumps, loads
from rest_framework.decorators import parser_classes
from rest_framework.parsers import JSONParser

# Create your views here.
@api_view(['GET'])
def index(request):
    return Response({"message": "Hello world!"})

@api_view(['POST'])
@parser_classes([JSONParser])
def get(request):
    if request.method != "POST":
        return Response({})

    request_params = loads(request.body)

    if not request_params["collection"]:
        return Response({})

    elements = [data for data in Database.get_data(request_params["collection"])]

    return Response({"data": dumps(elements)})

@api_view(['POST'])
@parser_classes([JSONParser])
def update(request):
    if request.method != "POST":
        return Response({})
    
    request_params = loads(request.body)

    if not request_params["collection"] or not request_params["id"] or not request_params["update"]:
        return Response({})

    Database.update_data(request_params["collection"], request_params["id"], request_params["update"])

    return Response("Success");
