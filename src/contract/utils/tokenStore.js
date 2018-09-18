const {abi, bytecode, contractAddress} = require("../compiled")
const nervos = require("../../nervos");
const transaction = require("../transaction");

export const getTX = () =>
    nervos.appchain.getBlockNumber().then(current => {
        // const tx = {
        //     ...transaction,
        //     from: '0x23a659e53b55ca1ba5ce741e12420cb64147f5d7',
        //     validUntilBlock: +current + 88,
        //     privateKey: '1208A2E6F122F64C2C4C380781A19D68DDD3CE614E3A688526548A0D61ABF0B1'
        // };
        const tx = {
            ...transaction,
            from: window.neuron.getAccount(),
            validUntilBlock: +current + 88
        };
        return tx;
    });

export const getContract = function () {
    return new nervos.appchain.Contract(abi, contractAddress);
};

export const txListener = function (method, tx, resolve, reject) {
    method
        .send(tx)
        .then(res => {
            console.log(res);
            let hash;
            if (JSON.stringify(res).indexOf("hash") !== -1) {
                hash = res.hash;
            } else {
                hash = res;
            }
            if (hash) {
                window.nervos.listeners
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
                reject("No Transaction Hash Received");
            }
        })
        .catch(err => {
            reject(err)
        })
}

export const deploy = async function (args) {
    return new Promise((resolve, reject) => {
        getTX()
            .then(tx => {
                const contract = new window.nervos.appchain.Contract(abi);
                contract
                    .deploy({data: bytecode, arguments: args})
                    .send(tx)
                    .then(res => {
                        console.log(res);
                        let hash;
                        if (JSON.stringify(res).indexOf("hash") !== -1) {
                            hash = res.hash;
                        } else {
                            hash = res;
                        }
                        if (hash) {
                            return window.nervos.listeners
                                .listenToTransactionReceipt(hash)
                                .then(receipt => {
                                    console.log(JSON.stringify(receipt));
                                    if (!receipt.errorMessage) {
                                        resolve(receipt);
                                    } else {
                                        reject(receipt.errorMessage);
                                    }
                                });
                        } else {
                            reject("No Transaction Hash Received");
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

export const getNowPage = () => {
    return new Promise(((resolve, reject) => {
        getContract().methods.nowPage().call().then((id) => {
            resolve(id)
        }).catch(err => {
            reject(err)
        })
    }))
}

export const getPageMsgIDs = (ID) => {
    return new Promise(((resolve, reject) => {
        getContract().methods.pageMsgIDs(ID).call().then((id) => {
            resolve(id)
        }).catch(err => {
            reject(err)
        })
    }))
}

export const getOwner = () => {
    return new Promise(((resolve, reject) => {
        getContract().methods.Owner().call().then((address) => {
            resolve(address)
        }).catch(err => {
            reject(err)
        })
    }))
}