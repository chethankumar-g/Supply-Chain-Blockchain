from flask import Blueprint, jsonify

admin_routes = Blueprint('admin_routes', __name__)

@admin_routes.route('/api/admin/unverified-products', methods=['GET'])
def unverified_products():
    return jsonify({'count': 3})

@admin_routes.route('/api/admin/sourcing-gaps', methods=['GET'])
def sourcing_gaps():
    return jsonify({'gaps': ['Missing certification', 'Broken chain of custody']})

@admin_routes.route('/api/admin/compliance-scores', methods=['GET'])
def compliance_scores():
    return jsonify({'scores': [
        {'participant': '0x123...', 'score': 95},
        {'participant': '0x456...', 'score': 80}
    ]})