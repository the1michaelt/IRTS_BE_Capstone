# Generated by Django 4.0.4 on 2022-11-28 17:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='year_semester',
        ),
    ]