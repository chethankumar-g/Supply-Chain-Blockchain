from flask import Blueprint, request, jsonify
import os
from utils.ipfs import IPFSUtils

certification_routes = Blueprint('certification_routes', __name__)
ipfs_utils = IPFSUtils()

@certification_routes.route('/api/certification/upload', methods=['POST'])
def upload_certification():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    file = request.files['file']
    file_path = os.path.join('/tmp', file.filename)
    file.save(file_path)
    ipfs_hash = ipfs_utils.upload_file(file_path)
    os.remove(file_path)
    if ipfs_hash:
        return jsonify({'ipfsHash': ipfs_hash}), 200
    else:
        return jsonify({'error': 'Failed to upload to IPFS'}), 500