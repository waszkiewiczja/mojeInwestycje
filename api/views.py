from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import IndeksPriceSerializer, StockPriceSerializer, NewconnectPriceSerializer
from base.models import IndeksPrice, StockPrice, NewconnectPrice

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {'GET': "/api/indeksy"},
        {'GET' : '/api/indeksy/id'},
        
    ]
    return Response(routes)


@api_view(["GET"])
def getIndeksy(request):
    indeksy = IndeksPrice.objects.all()
    serializer = IndeksPriceSerializer(indeksy, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def getIndeks(request,pk):
    indeks = IndeksPrice.objects.get(id=pk)
    serializer = IndeksPriceSerializer(indeks, many=False)
    return Response(serializer.data)


@api_view(["GET"])
def getAkcje(request):
    akcje = StockPrice.objects.all()
    serializer = StockPriceSerializer(akcje, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def getNewconnect(request):
    new = NewconnectPrice.objects.all()
    serializer = NewconnectPriceSerializer(new, many=True)
    return Response(serializer.data)



