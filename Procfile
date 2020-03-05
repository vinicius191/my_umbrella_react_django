release: python myumbrella/manage.py migrate
web: gunicorn --chdir myumbrella --log-file - myumbrella.wsgi:application