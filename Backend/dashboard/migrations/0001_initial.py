# Generated by Django 4.2.7 on 2024-01-28 11:58

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='RestaurantMenuModel',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('restaurantName', models.CharField(max_length=50)),
                ('foodName', models.CharField(max_length=50)),
                ('foodPrice', models.IntegerField()),
                ('foodDescription', models.CharField(max_length=200)),
                ('foodImage', models.ImageField(upload_to='foodImages/')),
            ],
        ),
        migrations.CreateModel(
            name='siteAdminModel',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('restaurantName', models.CharField(max_length=50)),
                ('restaurantDescription', models.CharField(max_length=200)),
                ('restaurantType', models.CharField(max_length=50)),
                ('restaurantImage', models.FileField(upload_to='restaurantImage/')),
                ('restaurantLocation', models.CharField(max_length=50)),
                ('restaurantRate', models.IntegerField()),
                ('restaurantUsername', models.CharField(max_length=50)),
                ('restaurantPassword', models.CharField(max_length=50)),
            ],
        ),
    ]
