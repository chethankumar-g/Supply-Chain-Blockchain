import ipfshttpclient

class IPFSUtils:
    def __init__(self, host='localhost', port=5001):
        self.client = ipfshttpclient.connect(f'/ip4/{host}/tcp/{port}/http')

    def upload_file(self, file_path):
        try:
            res = self.client.add(file_path)
            return res['Hash']
        except Exception as e:
            print(f"Error uploading file to IPFS: {e}")
            return None

    def retrieve_file(self, file_hash):
        try:
            return self.client.cat(file_hash)
        except Exception as e:
            print(f"Error retrieving file from IPFS: {e}")
            return None

    def get_file_url(self, file_hash):
        return f"https://ipfs.io/ipfs/{file_hash}"