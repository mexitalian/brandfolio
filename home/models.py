from __future__ import absolute_import, unicode_literals

from django.db import models

from wagtail.wagtailcore.models import Page, Orderable
from wagtail.wagtailcore.fields import RichTextField
from wagtail.wagtailadmin.edit_handlers import FieldPanel, MultiFieldPanel, InlinePanel
from modelcluster.fields import ParentalKey

class Benefits(models.Model):
    icon_classname = models.CharField(max_length=50)
    title = models.CharField(blank=False, max_length=255)
    copy = models.TextField(blank=True)

    panels = [
        FieldPanel("icon_classname"),
        FieldPanel("title"),
        FieldPanel("copy")
    ]

    class Meta:
        abstract = True

class HomePageBenefits(Orderable, Benefits):
    page = ParentalKey("HomePage", related_name="solution_benefits")

class Testimonials(models.Model):
    avatarURL = models.URLField()
    quote = RichTextField(help_text="Specific end result or benefit customer got + Specific Period of time + Accompanied Feeling + The Persons Name With Their Stats")
    person = models.TextField()
    profileURL = models.URLField()

    panels = [
        FieldPanel("avatarURL"),
        FieldPanel("quote"),
        FieldPanel("person"),
        FieldPanel("profileURL")
    ]

    class Meta:
        abstract = True

class HomePageTestimonials(Orderable, Testimonials):
    page = ParentalKey("HomePage", related_name="testimonials")


class HomePage(Page):

    headline = models.TextField(
        blank=False,
        help_text="End Result Customer Wants + Specific Period Of Time + Address The Objections"
    )
    headline_sub = RichTextField(blank=True)

    problem = RichTextField(
        blank=False,
        help_text="Explain the problem using your customers words"
    )

    solution = RichTextField(
        blank=False,
        help_text="Product Name Helps You Do [Task]. Say Goodbye To [Frustration] And Hello To [Benefit]. You Get [Top 3 Features + Benefits For Each Feature]"
    )

    credibility = RichTextField(
        blank=False,
        help_text="Tie your company to trusted symbols and famous authorities."
    )

    social_proof = RichTextField(
        blank=False,
        help_text="Show people are using your stuff and signing up"
    )

    cta = models.TextField(
        blank=True,
        help_text="Tell the customer to do something, such as asking for money (without guilt)."
    )
    cta_link = models.URLField(blank=True)

    guarantee = models.TextField(
        blank=True,
        help_text="Think guarantee's, but you're really just reducing fear."
    )

    price = models.TextField(
        blank=True,
        help_text="Make your price seem like a bargain"
    )

    faqs = RichTextField(
        blank=True,
        help_text="Boost your conversions by as much as 85% with an FAQ!"
    )



    content_panels = Page.content_panels + [
        MultiFieldPanel(
            [
                FieldPanel("headline"),
                FieldPanel("headline_sub")
            ],
            heading="Instant Clarity Headline"
        ),
        MultiFieldPanel(
            [
                FieldPanel("problem")
            ],
            heading="Declare the Problem"
        ),
        MultiFieldPanel(
            [
                FieldPanel("solution"),
                InlinePanel("solution_benefits", label="Solution Benefits", min_num=None, max_num=3)
            ],
            heading="Present Your Solution"
        ),
        MultiFieldPanel(
            [
                FieldPanel("credibility"),
            ],
            heading="Borrow Credibility"
        ),
        FieldPanel("social_proof"),
        MultiFieldPanel(
            [
                InlinePanel("testimonials", label="Testimonials"),
            ],
            heading="Proof your product works in your customers’ words."
        ),
        MultiFieldPanel(
            [
                FieldPanel("cta"),
                FieldPanel("cta_link")
            ],
            heading="Clear Call to take Action"
        ),
        FieldPanel("guarantee"),
        FieldPanel("price"),
        FieldPanel("faqs")
        # FieldPanel("body", classname="full")
    ]
