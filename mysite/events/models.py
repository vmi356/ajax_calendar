from django.db import models

class Category(models.Model):
    title = models.CharField(max_length=127)

class Event(models.Model):
    title = models.CharField(max_length=127)
    description = models.CharField(max_length=255)

    start = models.DateTimeField()
    duration = models.IntegerField(verbose_name='Duration, in minutes')
    category = models.ForeignKey(Category, null=True, blank=True)
