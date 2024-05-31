from django.db import models

class Stage(models.TextChoices):
    TODO = 'TODO', 'To Do'
    IN_PROGRESS = 'IN_PROGRESS', 'In Progress'
    DONE = 'DONE', 'Done'
    # Add more stages as needed

class Task(models.Model):
    id = models.AutoField(primary_key=True)
    stage = models.CharField(max_length=20, choices=Stage.choices, default=Stage.TODO)
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=20)
    owner = models.CharField(max_length=20)
    description = models.TextField()

    def __str__(self):
        return self.title
