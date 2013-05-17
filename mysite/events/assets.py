# -*- coding: utf-8 -*-
from django_assets import Bundle, register

js = Bundle('events/js/lib/*.js', 'events/js/*.js', output='assets/events.js')
register('events', js)

templates = Bundle('events/templates/*.hbs', output='assets/templates.js', filters='handlebars')
register('templates', templates)
