pragma solidity ^0.8.0;

contract SupplyChain {
    struct Participant {
        address participantAddress;
        string participantType; // Producer, Certifier, Transporter, Retailer
        bool isVerified;
    }

    struct Product {
        string batchId;
        string ipfsHash; // Hash of the sourcing certification document
        address producer;
        address[] transporters;
        address retailer;
        bool isVerified;
        bool isFlagged;
    }

    mapping(address => Participant) public participants;
    mapping(string => Product) public products;

    event ParticipantOnboarded(address participantAddress, string participantType);
    event ProductAdded(string batchId, address producer);
    event ProductStatusUpdated(string batchId, bool isVerified, bool isFlagged);

    modifier onlyVerified() {
        require(participants[msg.sender].isVerified, "Participant is not verified");
        _;
    }

    function onboardParticipant(address _participantAddress, string memory _participantType) public {
        participants[_participantAddress] = Participant({
            participantAddress: _participantAddress,
            participantType: _participantType,
            isVerified: false
        });
        emit ParticipantOnboarded(_participantAddress, _participantType);
    }

    function verifyParticipant(address _participantAddress) public {
        participants[_participantAddress].isVerified = true;
    }

    function addProduct(string memory _batchId, string memory _ipfsHash) public onlyVerified {
        products[_batchId] = Product({
            batchId: _batchId,
            ipfsHash: _ipfsHash,
            producer: msg.sender,
            transporters: new address[](0),
            retailer: address(0),
            isVerified: false,
            isFlagged: false
        });
        emit ProductAdded(_batchId, msg.sender);
    }

    function addTransporter(string memory _batchId, address _transporter) public onlyVerified {
        require(products[_batchId].producer == msg.sender, "Only the producer can add transporters");
        products[_batchId].transporters.push(_transporter);
    }

    function setRetailer(string memory _batchId, address _retailer) public onlyVerified {
        require(products[_batchId].producer == msg.sender, "Only the producer can set retailer");
        products[_batchId].retailer = _retailer;
    }

    function flagProduct(string memory _batchId) public {
        require(products[_batchId].producer == msg.sender, "Only the producer can flag the product");
        products[_batchId].isFlagged = true;
        emit ProductStatusUpdated(_batchId, products[_batchId].isVerified, true);
    }

    function verifyProduct(string memory _batchId) public {
        require(participants[msg.sender].isVerified, "Only verified participants can verify products");
        products[_batchId].isVerified = true;
        emit ProductStatusUpdated(_batchId, true, products[_batchId].isFlagged);
    }

    function getProduct(string memory _batchId) public view returns (Product memory) {
        return products[_batchId];
    }
}