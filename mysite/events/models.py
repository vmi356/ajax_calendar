from django.db import models

class Category(models.Model):
    title = models.CharField(max_length=127)
    description = models.CharField(max_length=255)

class Event(models.Model):
    title = models.CharField(max_length=127)
    description = models.CharField(max_length=255)
    link = models.URLField(max_length=255)

    date = models.DateTimeField()
    category = models.ForeignKey(Category, null=True, blank=True)
