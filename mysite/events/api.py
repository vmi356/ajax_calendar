# -*- coding: utf-8 -*-
from tastypie.authorization import DjangoAuthorization
from tastypie.constants import ALL
from tastypie.resources import ModelResource
from mysite.events.models import Event, Category


class EventResource(ModelResource):
    class Meta:
        queryset = Event.objects.all()
        resource_name = 'event'
        authorization = DjangoAuthorization()
        filtering = {
            "date": ALL,
            "category": ALL,
        }

class CategoryResourse(ModelResource):
    class Meta:
        queryset = Category.objects.all()
        resource_name = 'category'
