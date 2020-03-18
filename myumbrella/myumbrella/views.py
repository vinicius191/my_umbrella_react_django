from django.shortcuts import redirect, render
from django.views.decorators.csrf import ensure_csrf_cookie
from django.template import RequestContext

@ensure_csrf_cookie
def index(request):
    return render(request, 'frontend/index.html')
