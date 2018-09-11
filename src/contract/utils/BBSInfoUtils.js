/**
 * Created by 包俊 on 2018/9/9.
 */
import {getTX, getContract, txListener} from './tokenStore'

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
        }
    }))
}