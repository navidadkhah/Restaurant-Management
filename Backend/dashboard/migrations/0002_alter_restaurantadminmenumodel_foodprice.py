# Generated by Django 4.2.7 on 2023-12-19 13:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='restaurantadminmenumodel',
            name='foodPrice',
            field=models.IntegerField(),
        ),
    ]