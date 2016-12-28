from django.shortcuts import render
from django.http import HttpResponseRedirect, JsonResponse
from .forms import ContactForm

# Create your views here.
def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)

        if form.is_valid():
            contact = form.save()
            return JsonResponse({'success': True})
        else:
            return JsonResponse({
                'success': False,
                'errors': form.errors
            })
    else:
        form = ContactForm()

    return render(request, 'form/contact.html', {'form': form})
