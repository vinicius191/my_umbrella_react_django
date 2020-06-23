WEBPACK = [.]bin/webpack

start: django react

django:
	python manage.py runserver --nostatic & echo "$$!" > "django.pid" 

react:
	cd ../ && npm run dev & echo "$$!" > "react.pid" 

sql:
	sudo service postgresql start

stop:
	kill `cat "django.pid"` && rm "django.pid"
	kill `cat "react.pid"` && rm "react.pid"
	kill -9 `ps aux | grep -i $(WEBPACK) | awk '{print $$2}'`
	sudo service postgresql stop
	
.PHONY: start stop