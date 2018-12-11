const { abi, bytecode } = require('../constantNoAdmin');
const appchain = require('../../appchain');
const transaction = require('../transaction');

export const getTX = () =>
  appchain.base.getBlockNumber().then(current => {
    // const tx = {
    //     ...transaction,
    //     from: '',
    //     validUntilBlock: +current + 88,
    //     privateKey: ''
    // };
    const tx = {
      ...transaction,
      from: window.neuron.getAccount(),
      validUntilBlock: +current + 88
    };
    return tx;
  });

export const getContract = function() {
  return new appchain.base.Contract(abi, window.BBSAddress);
};

export const TXManager = method => {
  return new Promise((resolve, reject) => {
    getTX().then(tx => {
      txListener(method, tx, resolve, reject);
    });
  });
};

export const txListener = function(method, tx, resolve, reject) {
  method
    .send(tx)
    .then(res => {
      console.log(res);
      let hash;
      if (JSON.stringify(res).indexOf('hash') !== -1) {
        hash = res.hash;
      } else {
        hash = res;
      }
      if (hash) {
        window.appchain.listeners
          .listenToTransactionReceipt(hash)
          .then(receipt => {
            if (!receipt.errorMessage) {
              resolve(receipt);
            } else {
              reject(receipt.errorMessage);
            }
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      } else {
        reject('No Transaction Hash Received');
      }
    })
    .catch(err => {
      reject(err);
    });
};

export const deploy = async function(args) {
  console.log(args);
  return new Promise((resolve, reject) => {
    getTX()
      .then(tx => {
        console.log(JSON.stringify(tx))
        const contract = new appchain.base.Contract(abi);
        contract
          .deploy({ data: bytecode, arguments: args })
          .send(tx)
          .then(res => {
            console.log(res);
            if (res.hash) {
              return window.appchain.listeners
                .listenToTransactionReceipt(res.hash)
                .then(receipt => {
                  console.log(JSON.stringify(receipt));
                  if (!receipt.errorMessage) {
                    resolve(receipt);
                  } else {
                    reject(receipt.errorMessage);
                  }
                });
            } else {
              reject('No Transaction Hash Received');
            }
          })
          .catch(err => {
            console.log(err);
            reject(err.errorMessage);
          });
      })
      .catch(err => {
        console.log(err);
        reject(err.errorMessage);
      });
  });
};
