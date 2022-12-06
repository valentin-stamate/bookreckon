# Generated by Django 4.1.3 on 2022-11-29 16:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('recommendation_service_api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Recommendations',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.FloatField(blank=True, null=True)),
                ('books', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='recommendation_service_api.books')),
            ],
        ),
    ]