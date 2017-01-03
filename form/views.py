from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect, JsonResponse
from .forms import ContactForm
# Email
from django.core.mail import EmailMessage
from django.template import Context
from django.template.loader import get_template

# Create your views here.
def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)

        if form.is_valid():
            # create email to send
            name = request.POST.get('name', '')
            email = request.POST.get('email', '')
            message = request.POST.get('message', '')
            template = get_template('contact.txt')
            context = Context({
                'name': name,
                'email': email,
                'content': message
            })
            content = template.render(context)
            email = EmailMessage(
                "New contact form submission",
                content,
                "Your website" +'',
                ['hello@charlos.co.uk'],
                headers = {'Reply-To': email }
            )
            email.send()
            # save to db
            contact = form.save()
            # return response
            return JsonResponse({'success': True})
        else:
            return JsonResponse({
                'success': False,
                'errors': form.errors
            })
    else:
        # form = ContactForm()
        # return render(request, 'form/contact.html', {'form': form})
        # return a 404, this URL is an endpoint not a standalone form
        logger.info("hello")
        return render(request, '404.html')
