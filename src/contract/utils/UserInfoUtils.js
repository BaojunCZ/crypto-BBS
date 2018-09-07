/**
 * Created by 包俊 on 2018/9/7.
 */
import {getTX, getContract, txListener} from './tokenStore'
import {address1, privateKey1, address2, privateKey2} from "../test.config"

export const initPlayer = async function (name, sex, icon) {
    return new Promise(((resolve, reject) => {
        getTX().then(tx => {
            txListener(getContract().methods.initPlayer(name, sex, icon), tx, resolve, reject);
        }).catch(err => {
            reject(err)
        })
    }))
}

export const getPlayer = (address) => {
    return new Promise((resolve, reject) => {
        getContract().methods.player(address).call().then((res) => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const setName = (name) => {
    return new Promise(((resolve, reject) => {
        getTX().then(tx => {
            getContract().methods.setName(name).send(tx).then(res => {
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

export const setSex = (sex) => {
    return new Promise(((resolve, reject) => {
        getTX().then(tx => {
            getContract().methods.setSex(sex).send(tx).then(res => {
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

