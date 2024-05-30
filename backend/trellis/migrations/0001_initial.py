# Generated by Django 5.0.6 on 2024-05-30 05:26

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('stage', models.CharField(choices=[('TODO', 'To Do'), ('IN_PROGRESS', 'In Progress'), ('DONE', 'Done')], default='TODO', max_length=20)),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tasks_authored', to=settings.AUTH_USER_MODEL)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tasks_owned', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
