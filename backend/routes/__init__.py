from flask import Blueprint

from .participant_routes import participant_routes
from .product_routes import product_routes
from .certification_routes import certification_routes
from .admin_routes import admin_routes

api_routes = Blueprint('api_routes', __name__)

api_routes.register_blueprint(participant_routes)
api_routes.register_blueprint(product_routes)
api_routes.register_blueprint(certification_routes)
api_routes.register_blueprint(admin_routes)