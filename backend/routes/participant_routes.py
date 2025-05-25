from flask import Blueprint, request, jsonify

participant_routes = Blueprint('participant_routes', __name__)

kyc_store = {}

@participant_routes.route('/api/participant/onboard', methods=['POST'])
def onboard_participant():
    data = request.json
    address = data.get('address')
    name = data.get('name')
    role = data.get('role')
    if not address or not name or not role:
        return jsonify({'error': 'Missing fields'}), 400
    kyc_store[address] = {'name': name, 'role': role, 'kyc': True}
    return jsonify({'message': 'Participant onboarded and KYC verified', 'address': address}), 200

@participant_routes.route('/api/participant/kyc/<address>', methods=['GET'])
def get_kyc(address):
    info = kyc_store.get(address)
    if not info:
        return jsonify({'kyc': False})
    return jsonify({'kyc': info['kyc'], 'name': info['name'], 'role': info['role']})