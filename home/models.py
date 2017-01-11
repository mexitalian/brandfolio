from __future__ import absolute_import, unicode_literals

from django.db import models

from wagtail.wagtailcore import blocks
from wagtail.wagtailcore.models import Page, Orderable
from wagtail.wagtailcore.fields import RichTextField, StreamField
from wagtail.wagtaildocs.blocks import DocumentChooserBlock
from wagtail.wagtailimages.models import Image
from wagtail.wagtailimages.blocks import ImageChooserBlock
from wagtail.wagtailimages.edit_handlers import ImageChooserPanel
from wagtail.wagtailembeds.blocks import EmbedBlock
from wagtail.wagtailadmin.edit_handlers import FieldPanel, MultiFieldPanel, InlinePanel, StreamFieldPanel
from modelcluster.fields import ParentalKey
from form import forms


# Blocks ------

class HeadingBlock(blocks.StructBlock):
    title = blocks.TextBlock()
    subtitle = blocks.RichTextBlock(required=False)

    class meta:
        icon = "title"

class ActionBlock(blocks.StructBlock):
    text = blocks.CharBlock()
    icon = blocks.CharBlock(max_length=50, required=False, help_text="Optional: FontAwesome icon classname")
    # below can be done automagically by parsing the url to check for /relative (local) opening local target = _parent and external target = _blank
    target_blank = blocks.BooleanBlock(required=False, help_text="Open link in a new tab?")

    class meta:
        icon = "pick"

class LinkBlock(ActionBlock):
    url = blocks.CharBlock()

    class Meta:
        icon = "link"

class LinkDocBlock(ActionBlock):
    doc = DocumentChooserBlock()

    class Meta:
        icon = "doc-empty"

class HeroBlock(blocks.StreamBlock):
    title = blocks.TextBlock(
        blank=False,
        help_text="End Result Customer Wants + Specific Period Of Time + Address The Objections"
    )
    subtitle = blocks.RichTextBlock(blank=True)
    links = blocks.ListBlock(LinkBlock(required=False))

    class meta:
        icon = "user"

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

#   > Showcase
class Image(models.Model):
    image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    panels = [
        ImageChooserPanel("image")
    ]

    class Meta:
        abstract = True

class ProjectPageImages(Orderable, Image):
    page = ParentalKey("ProjectPage", related_name="images")

class Action(models.Model):
    text = models.CharField(max_length=100)
    icon = models.CharField(max_length=50, blank=True, help_text="Optional: FontAwesome icon classname")

    panels = [
        FieldPanel("text"),
        FieldPanel("icon")
    ]

    class Meta:
        abstract = True

# ActionJS will be extended from Action once it is needed for firing JS events
class ActionLink(Action):
    # below can be done automagically by parsing the url to check for /relative (local) opening local target = _parent and external target = _blank
    link = models.URLField()
    target_blank = models.BooleanField(default=True, help_text="Open in separate tab?")

    panels = Action.panels + [
        FieldPanel("link"),
        FieldPanel("target_blank")
    ]

class ProjectPageActions(Orderable, ActionLink):
    page = ParentalKey("ProjectPage", related_name="cta")


class LegendBlock(blocks.StreamBlock):
    icon = blocks.CharBlock(max_length=50, required=False, help_text="Optional: FontAwesome icon classname")

    class Meta:
        icon = "plus"

# Employ templates per block later
# class ProjectPageEmbedBlock(EmbedBlock):
#     class Meta:
#         template = "blocks/project_embed.html"


# Pages -----
# -----------
class HomePage(Page):

    headline = StreamField(HeroBlock())

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
        help_text="E.g. 37signals is famous for this. Basecamphq.com - “millions of people use basecamp”"
    )

    cta = StreamField([
        ("heading", HeadingBlock(icon="title")),
        ("actions", blocks.StreamBlock([
            ("link", LinkBlock(icon="link")),
            ("doc", LinkDocBlock(icon="doc-empty"))
        ], icon="pick"))
    ])

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

    # move the footer form to a footer snippet : eventually
    form = forms.ContactForm()



    content_panels = Page.content_panels + [
        StreamFieldPanel("headline"), # heading="Instant Clarity Headline"
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
        MultiFieldPanel(
            [
                FieldPanel("social_proof")
            ],
            heading="Show people are using your stuff and signing up"
        ),
        MultiFieldPanel(
            [
                InlinePanel("testimonials", label="Testimonials"),
            ],
            heading="Proof your product works in your customers’ words."
        ),
        StreamFieldPanel("cta"),
        FieldPanel("guarantee"),
        FieldPanel("price"),
        FieldPanel("faqs")
        # FieldPanel("body", classname="full")
    ]


class ShowcasePage(Page):
    heading = RichTextField()

    content_panels = Page.content_panels + [
        FieldPanel('heading')
    ]


class ProjectPage(Page):
    heading = RichTextField()
    summary = models.TextField(blank=True)
    content = StreamField([
        ("image", ImageChooserBlock()),
        ("embed", EmbedBlock()),
        ("blockquote", blocks.BlockQuoteBlock()),
        ("text", blocks.RichTextBlock())
    ], default=None)
    concept = RichTextField(blank=True)
    tech = RichTextField(blank=True)
    legend = StreamField(LegendBlock(), default=None)

    content_panels = Page.content_panels + [
        FieldPanel("heading"),
        InlinePanel("images", label="Cover and carousel images", min_num=1),
        FieldPanel("summary"),
        StreamFieldPanel("content"),
        FieldPanel("concept"),
        FieldPanel("tech"),
        MultiFieldPanel([
            InlinePanel("cta", min_num=None)
        ], heading="Call to action/s"),
        StreamFieldPanel("legend")
    ]
