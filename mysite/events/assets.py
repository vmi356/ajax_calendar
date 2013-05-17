# -*- coding: utf-8 -*-
from django_assets import Bundle, register

js = Bundle('events/*.js',  output='assets/packed.js')
register('js_all', js)
