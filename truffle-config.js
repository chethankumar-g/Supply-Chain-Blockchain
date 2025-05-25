module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545, // Ganache default port
      network_id: "*", // Match any network id
    },
    // Add other networks as needed
  },
  compilers: {
    solc: {
      version: "0.8.0", // Specify the Solidity version
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
};