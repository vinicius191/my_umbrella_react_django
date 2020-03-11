from django.shortcuts import redirect, render

def index(request):
    return render(request, 'frontend/index.html')

def view_404(request, exception=None):
    # make a redirect to homepage
    # you can use the name of url or just the plain link
    return redirect('/') # or redirect('name-of-index-url')