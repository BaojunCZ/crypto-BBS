const {abi, bytecode, contractAddress} = require("../compiled")
const nervos = require("../../nervos");
const transaction = require("../transaction");
const {address1, privateKey1, address2, privateKey2} = require("../test.config")

export const getTX = () =>
    nervos.appchain.getBlockNumber().then(current => {
        // const tx = {
        //     ...transaction,
        //     from: address1,
        //     validUntilBlock: +current + 88,
        //     privateKey: privateKey1
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
                        console.log(err.errorMessage);
                        reject(err.errorMessage);
                    });
            })
            .catch(err => {
                console.log(err);
                reject(err.errorMessage);
            });
    });
};

export const sendMessage = (imgUrl, info) => {
    return new Promise(((resolve, reject) => {
        getTX().then(tx => {
            getContract().methods.singIn(imgUrl, info).send(tx).then(res => {
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
            }).catch(err => {
                reject(err)
            })
        }).catch(err => {
            reject(err)
        })

    }))
}

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