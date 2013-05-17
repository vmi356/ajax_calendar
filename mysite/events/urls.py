# -*- coding: utf-8 -*-
from django.conf.urls import url, patterns, include
from api import EventResource, CategoryResourse
from django.views.generic import TemplateView
from tastypie.api import Api

v1_api = Api(api_name='v1')
v1_api.register(EventResource())
v1_api.register(CategoryResourse())

urlpatterns = patterns('',
   url(r'^$', TemplateView.as_view(template_name='month.html'), name='month'),
    url(r'^api/', include(v1_api.urls)),
)
