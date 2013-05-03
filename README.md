django repository blueprint for students
========================================

Usage
------

1. Download and unzip repository: https://github.com/vmi356/django_blueprint/archive/master.zip
2. Bootstrap buildout: ``python bootstrap.py``
3. Verify project settings in ``buildout.cfg``
4. Run buildout: ``bin/buildout``

**Don't forget to make an initial commit!**

How to setup Pycharm IDE
-------------------------

1. Open menu File > Settings > **buildout support**

    check enable buildout support

    enter path to ``bin/django``

2. In settings, open **Django support**

    Set project root to folder where ``settings.py`` located

3. In settings, open **python template languages**

    Set template language to Django
    Add template folders below

4. Open menu Run > edit configurations

    Add ``DJANGO_SETTINGS_MODULE=mysite.development`` to environment variables.

