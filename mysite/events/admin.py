# -*- coding: utf-8 -*-
from django.contrib.admin import site
from mysite.events.models import Category, Event

site.register(Category)
site.register(Event)
