WEBPACK = [.]bin/webpack

start: django react

django:
	python manage.py runserver & echo "$$!" > "django.pid" 

react:
	cd ../ && npm run dev & echo "$$!" > "react.pid" 

stop:
	kill `cat "django.pid"` && rm "django.pid"
	kill `cat "react.pid"` && rm "react.pid"
	kill -9 `ps aux | grep -i $(WEBPACK) | awk '{print $$2}'`
	
.PHONY: start stop