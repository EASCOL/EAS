from django.urls import path
from . import views

urlpatterns = [
    # path("put", views.put, name="put"),
    path("get", views.get, name="get_data"),
    path("update", views.update, name="update_data")
]