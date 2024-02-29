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

# @api_view(['GET'])
# def put(request):
#     insertion_id = Database.insert_data("lockers", {
#         "locker_number": 4,
#         "block": 16
#     })

#     return Response({"insertion_id": f"{insertion_id}"})

@api_view(['POST'])
@parser_classes([JSONParser])
def get(request):

    if request.method != "POST":
        return Response({})
    
    request_params = loads(request.body)

    lockers = [locker for locker in Database.get_data(request_params["collection"])]

    return Response({"data": dumps(lockers)})

