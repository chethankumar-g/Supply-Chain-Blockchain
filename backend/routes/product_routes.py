from flask import Blueprint, request, jsonify
from web3 import Web3
import json
import os

product_routes = Blueprint('product_routes', __name__)

w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:7545'))
with open(os.path.join(os.path.dirname(__file__), '../../build/contracts/SupplyChain.json')) as f:
    contract_json = json.load(f)
contract_abi = contract_json['abi']
contract_address = os.environ.get('SUPPLYCHAIN_CONTRACT_ADDRESS')
contract = w3.eth.contract(address=contract_address, abi=contract_abi)

@product_routes.route('/api/product/add', methods=['POST'])
def add_product():
    data = request.json
    batch_id = data.get('batchId')
    ipfs_hash = data.get('ipfsHash')
    producer = data.get('producer')
    if not batch_id or not ipfs_hash or not producer:
        return jsonify({'error': 'Missing fields'}), 400
    try:
        tx_hash = contract.functions.addProduct(batch_id, ipfs_hash).transact({'from': producer})
        w3.eth.wait_for_transaction_receipt(tx_hash)
        return jsonify({'message': 'Product added', 'tx': tx_hash.hex()}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@product_routes.route('/api/product/<batch_id>', methods=['GET'])
def get_product(batch_id):
    try:
        product = contract.functions.getProduct(batch_id).call()
        return jsonify({
            'batchId': product[0],
            'ipfsHash': product[1],
            'producer': product[2],
            'transporters': product[3],
            'retailer': product[4],
            'isVerified': product[5],
            'isFlagged': product[6]
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500