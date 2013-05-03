ajax calendar
=============

Запуск
------

1. **Склонировать** репозиторий: ``git://github.com/vmi356/ajax_calendar.git``
2. Волшебное слово: ``python bootstrap.py``
3. Волшебное слово: ``bin/buildout``

Используемые библиотеки и технологии
-------------------------------------

* Django
* jQuery
* twitter bootstrap
* [Django-tastypie](http://tastypieapi.org/)
* [jQuery fullCalendar](http://arshaw.com/fullcalendar/)
* [JSON2.js для кодирования строк](https://github.com/douglascrockford/JSON-js)

Как работает?
-------------

### Сервер:

1. Создана схема данных, оформлена в виде [django app](https://github
.com/vmi356/ajax_calendar/tree/master/mysite/events)
2. Схема зарегистрирована в виде [REST API](https://github.com/vmi356/ajax_calendar/blob/master/mysite/events/api.py)
, которое, в свою очередь зарегистрировано в [urlconf](https://github.com/vmi356/ajax_calendar/blob/master/mysite/events/urls.py)
3. При загрузке в шаблоне [frontpage.html](https://github.com/vmi356/ajax_calendar/blob/master/mysite/templates/frontpage.html) подключаются доп. библиотеки,
создается контейнер для календаря ``<div id="calendar"></div>``

### Клиент

4. Затем, в [main.js](https://github.com/vmi356/ajax_calendar/blob/master/mysite/media/js/main.js) после загрузки
страницы инициализируется плагин
5. Создается обработчик клика по дню в календаре
6. Загуржаются все события с сервера
