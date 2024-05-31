# How to Run
Clone the project to your local machine.
## Backend
Activate venv, enter the ```backend``` directory, install packages as below.

```pip install -r requirements.txt```

Then run Django 

```python manage.py runserver```

Log into the admin site (username is ```admin```, password is ```12345678```), create a few new users.

## Frontend
Enter the ```react``` directory, install packages as below.

```npm install```

Then run the React frontend

```next dev```

Then start using the app at ```localhost:3000```. First login using the username/password created via Django admin, then assign and manage tasks.
