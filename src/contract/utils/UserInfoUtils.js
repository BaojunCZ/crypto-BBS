/**
 * Created by 包俊 on 2018/9/7.
 */
import {getTX, getContract, txListener, TXManager} from './tokenStore'

export const initPlayer = async function (name, sex, icon, synopsis) {
    return new Promise(((resolve, reject) => {
        getTX().then(tx => {
            console.log(tx)
            txListener(getContract().methods.initPlayer(name, sex, icon, synopsis), tx, resolve, reject);
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

export const getPlayerMsgSize = (address) => {
    return new Promise((resolve, reject) => {
        getContract().methods.getPlayerMsgSize(address).call().then((res) => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const getPlayerMsg = (index) => {
    return new Promise((resolve, reject) => {
        getContract().methods.getPlayerMsg(index, window.neuron.getAccount()).call().then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const getFavoriteSize = () => {
    return new Promise((resolve, reject) => {
        getContract().methods.getFavoriteSize(window.neuron.getAccount()).call({from: window.neuron.getAccount()}).then((res) => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const getFavorite = (index) => {
    return new Promise((resolve, reject) => {
        getContract().methods.getFavorite(index, window.neuron.getAccount()).call().then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const getBalance = (address) => {
    return new Promise((resolve) => {
        resolve(window.nervos.appchain.getBalance(address))
    })
}

export const setName = (name) => {
    return TXManager(getContract().methods.setName(name))
}

export const setIcon = (icon) => {
    return TXManager(getContract().methods.setIcon(icon))
}

export const setSynopsis = (synopsis) => {
    return TXManager(getContract().methods.setSynopsis(synopsis))
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

