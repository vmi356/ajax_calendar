# -*- coding: utf-8 -*-
from django_assets import Bundle, register

register(
    'events',
    Bundle('events/js/vendor/*.js', 'events/js/lib/*.js', 'events/js/*.js',
            output='assets/events.js')
)

register(
    'templates',
    Bundle('events/templates/*.hbs', output='assets/templates.js', filters='handlebars')
)
