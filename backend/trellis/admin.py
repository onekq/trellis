from django.contrib import admin
from .models import Task

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'owner', 'stage')
    list_filter = ('stage', 'author', 'owner')
    search_fields = ('title', 'description', 'author', 'owner')
    ordering = ('stage', 'title')

    fieldsets = (
        (None, {
            'fields': ('title', 'description')
        }),
        ('Ownership', {
            'fields': ('author', 'owner')
        }),
        ('Status', {
            'fields': ('stage',)
        }),
    )