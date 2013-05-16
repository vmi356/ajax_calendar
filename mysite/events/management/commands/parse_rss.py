from django.core.management.base import BaseCommand, CommandError
from mysite.events.models import Event, Category
import feedparser


class Command(BaseCommand):
    help = "Import events from RSS"
    args = ['feed url', ]

    def handle(self, *args, **options):
        if len(args) < 1:
            raise CommandError('feed url required')

        d = feedparser.parse(args[0])

        category, _ = Category.objects.get_or_create(title=d.feed.title)
        category.description = d.feed.description
        category.save()

        for article in d.entries:
            print('exporting event', article.title)
            event = Event(
                title=article.title,
                description=article.description,
                link=article.link,
                date=article.updated,
                category=category
            )
            event.save()
