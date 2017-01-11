# from __future__ import absolute_import, unicode_literals

from django import template
from django.utils.safestring import mark_safe
from wagtail.wagtailcore.rich_text import RichText, expand_db_html
from form.forms import ContactForm

register = template.Library()

@register.filter
def simplerichtext(value):
    if isinstance(value, RichText):
        # passing a RichText value through the |richtext filter should have no effect
        return value
    elif value is None:
        html = ''
    else:
        html = expand_db_html(value)

    return mark_safe(html)


@register.inclusion_tag("contact_form.html")
def contact_form():
    form = ContactForm()
    return {"form": form}
