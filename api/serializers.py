from rest_framework import serializers
from base.models import IndeksPrice, StockPrice, NewconnectPrice

class IndeksPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndeksPrice
        fields = '__all__'


class StockPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockPrice
        fields = '__all__'


class NewconnectPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewconnectPrice
        fields = '__all__'