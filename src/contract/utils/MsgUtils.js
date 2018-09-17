/**
 * Created by 包俊 on 2018/9/12.
 */
import {getTX, getContract, txListener} from './tokenStore'

export const sendMsg = (image, info) => {
    return new Promise((resolve, reject) => {
        getTX().then(tx => {
            txListener(getContract().methods.sendMessage(image, info), tx, resolve, reject)
        })
    })
}

export const getMsgID = (index) => {
    return new Promise((resolve, reject) => {
        getContract().methods.MsgIDs(index).call().then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const getMsg = (id) => {
    return new Promise(((resolve, reject) => {
        getContract().methods.data(id).call().then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    }))
}

