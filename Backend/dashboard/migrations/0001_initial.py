# Generated by Django 4.2.3 on 2023-12-22 16:15

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='RestaurantAdminMenuModel',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('foodName', models.CharField(max_length=50)),
                ('foodPrice', models.IntegerField()),
                ('foodDescription', models.CharField(max_length=200)),
                ('foodType', models.CharField(max_length=50)),
                ('foodImage', models.ImageField(upload_to='foodImages/')),
            ],
        ),
        migrations.CreateModel(
            name='RestaurantAdminModel',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('restaurantUsername', models.CharField(max_length=50)),
                ('restaurantPassword', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='RestaurantAdminProfileModel',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('restaurantDescription', models.CharField(max_length=200)),
                ('restaurantImage', models.ImageField(upload_to='restaurantImages/')),
            ],
        ),
        migrations.CreateModel(
            name='siteAdminModel',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('restaurantName', models.CharField(max_length=50)),
                ('restaurantDescription', models.CharField(max_length=200)),
                ('restaurantType', models.EmailField(max_length=50)),
                ('restaurantImage', models.ImageField(upload_to='restaurantImages/')),
            ],
        ),
    ]