# EAS: EAFIT Administration System

The main purpose of this system is for students and administrators to be able to easily manage classrooms and lockers with the advantages of modern web solutions, avoiding the usual tedious manual process when using these services.

### Its main features include:
- Reserve lockers and classrooms
- Check availability of lockers and schedule management for classrooms reservations.
- Live support for possible questions when using this system.
- EAFIT staff can manage and administrate students’ reservations.

## How to run the server yourself
At this point you may have been curious on how the application is run.

### Main requirements are listed here:
- [NodeJS 20.11.1 LTS](https://nodejs.org/en) or later
- Python 3.11 or later
- MongoDB 7.0.7 or later

### Language-specific requirements:
For Python, you will need:
- Django 5.0.3 or later
- Django REST framework 3.14.0 or later
- Pymongo 4.6.2 or later

The front-end side is managed with **[React](https://react.dev)**, using **[Vite](https://vitejs.dev)** as a building tool. `Package.json` is already included on the project, so by using `npm install` inside `eas_site/react_site` should suffice for all used packages.

To start the front-end-side client, go to `/eas_site/react_site` and use `npm run dev` to start the development server.

The server-side is managed with **[Python](https://www.python.org)**, using **[Django](https://www.djangoproject.com)** as the backend framework and **[Django REST Framework](https://www.django-rest-framework.org)** for API calls via REST. It is **strongly recommended** to use **virtualenv** for this project, or even in general when working with Django projects, as it creates a sandbox with unique configurations separated from global configurations and avoiding unexpected behaviors.

To start the server-side client, go to `/eas_site` and use `python manage.py runserver`.

Database is managed with **[MongoDB](https://www.mongodb.com/)**, using **[Pymongo](https://pymongo.readthedocs.io/en/stable/)** as a server-side package on Python for communication and data manipulation.
