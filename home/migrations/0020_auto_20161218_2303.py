# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2016-12-18 23:03
from __future__ import unicode_literals

from django.db import migrations
import wagtail.wagtailcore.blocks
import wagtail.wagtailcore.fields


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0019_auto_20161218_2254'),
    ]

    operations = [
        migrations.AlterField(
            model_name='homepage',
            name='headline',
            field=wagtail.wagtailcore.fields.StreamField((('title', wagtail.wagtailcore.blocks.TextBlock(blank=False, help_text='End Result Customer Wants + Specific Period Of Time + Address The Objections')), ('subtitle', wagtail.wagtailcore.blocks.RichTextBlock(blank=True)), ('link', wagtail.wagtailcore.blocks.StructBlock((('target_blank', wagtail.wagtailcore.blocks.BooleanBlock(help_text='Open link in a new tab?', required=False)),))))),
        ),
    ]
