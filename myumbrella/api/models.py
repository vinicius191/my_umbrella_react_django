from django.contrib.auth import get_user_model
from django.db import models

class Favourite(models.Model):
    user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE
    )
    city_country = models.CharField(
        max_length=150,
        verbose_name=("city_country"),
        help_text=("City and Country")
    )
    created_at = models.DateTimeField(auto_now_add=True)
    created_at.editable=True

class Meta:
    verbose_name = ("Favourite")
    verbose_name_plural = ("Favourites")
    ordering = ("user", "city_country")

def __str__(self):
    return "%s - %s" % (self.user, self.city_country)
