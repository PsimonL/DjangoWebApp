# TODO: Not Finished
# TODO: No idea what to store
# python manage,py makemigrations App

from django.db import models



class User(models.Model):
    __tablename__ = 'table'
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
