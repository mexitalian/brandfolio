# Settings for Dreamhost shared hosting

from __future__ import absolute_import, unicode_literals

from .base import *

with open('secret_key.txt') as f:
  SECRET_KEY = f.read().strip()

DEBUG = False

ALLOWED_HOSTS = [
  '.charlos.co.uk',
  '.charlos.co.uk.'
]

try:
    from .local import *
except ImportError:
    pass
