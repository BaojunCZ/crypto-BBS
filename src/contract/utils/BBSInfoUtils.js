/**
 * Created by 包俊 on 2018/9/9.
 */
import {getContract, TXManager} from './tokenStore'

const {abi, bytecode} = require("../constantNoAdmin")

export const getBBSName = async function (address) {
    return new Promise(((resolve, reject) => {
        let contract = new window.nervos.appchain.Contract(abi, address);
        contract.methods.BBSName().call().then((BBSName) => {
            resolve(BBSName)
        }).catch(err => {
            reject(err)
        })
    }))
}

export const getBBSInfo = async function (attr) {
    return new Promise(((resolve, reject) => {
        switch (attr) {
            case "BBSName":
                getContract().methods.BBSName().call().then((BBSName) => {
                    resolve(BBSName)
                }).catch(err => {
                    reject(err)
                })
                break
            case "BBSDescribe":
                getContract().methods.BBSDescribe().call().then((BBSDescribe) => {
                    resolve(BBSDescribe)
                }).catch(err => {
                    reject(err)
                })
                break
            case "BBSLogo":
                getContract().methods.BBSLogo().call().then((BBSLogo) => {
                    resolve(BBSLogo)
                }).catch(err => {
                    reject(err)
                })
                break
            case "playerCount":
                getContract().methods.playerCount().call().then((playerCount) => {
                    resolve(playerCount)
                }).catch(err => {
                    reject(err)
                })
                break
            case "BBSSynopsis":
                getContract().methods.BBSSynopsis().call().then((BBSSynopsis) => {
                    resolve(BBSSynopsis)
                }).catch(err => {
                    reject(err)
                })
                break
            case "msgCount":
                getContract().methods.getMsgIDSize().call().then((msgCount) => {
                    resolve(msgCount)
                }).catch(err => {
                    reject(err)
                })
                break
            case "Owner":
                getContract().methods.Owner().call().then((msgCount) => {
                    resolve(msgCount)
                }).catch(err => {
                    reject(err)
                })
                break
        }
    }))
}

export const setBBSLogo = (logo) => {
    return TXManager(getContract().methods.setBBSLogo(logo))
}

export const setBBSName = (name) => {
    return TXManager(getContract().methods.setBBSName(name))
}

export const setBBSSynopsis = (synopsis) => {
    return TXManager(getContract().methods.setBBSSynopsis(synopsis))
}

export const setBBSDescribe = (describe) => {
    return TXManager(getContract().methods.setBBSDescribe(describe))
}