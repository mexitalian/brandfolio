# Brand CMS
One page funnel and brand CMS built on Wagtail & Django.  
**First attempt using the Wagtail framework**

## Requirements
- Python3

## Development Setup
Within root directory 'branfolio-wagtail'
```
$ pip install -r requirements.txt
$ pip install -r requirements-freeze.txt
```

## Deployment
### Dreamhost shared hosting
- Enable **Passenger** on the sub/domain
- Setup **virtualenv** to use Python3 and install all dependancies via **pip**.
- Run through standard inits, (including but not limited to)
  ```
  $ ./manage.py makemigrations
  $ ./manage.py migrate
  $ ./manage.py collectstatic
  ```
- Goto **Panel > Domains > Remap Sub-Dir** then add a subdirectory /media to the sub/domain pointing it at Django's media folder
- Create `passenger_wsgi.py` in domain root (not in /public)

```bash
# Passenger WSGI config
# /env/ is where the virtualenv was setup
import sys, os
INTERP = "/home/mexitalian/charlos.co.uk/env/bin/python3"
#INTERP is present twice so that the new python interpreter knows the actual executable path
if sys.executable != INTERP: os.execl(INTERP, INTERP, *sys.argv)

cwd = os.getcwd()
sys.path.append(cwd)
sys.path.append(cwd + '/brandfolio')  # add project here

sys.path.insert(0,cwd+'/env/bin')
sys.path.insert(0,cwd+'/env/lib/python3.6/site-packages')

os.environ['DJANGO_SETTINGS_MODULE'] = "charlos.settings.production"
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```
[Original instructions](https://help.dreamhost.com/hc/en-us/articles/215319648-How-to-create-a-Django-project-using-virtualenv)
