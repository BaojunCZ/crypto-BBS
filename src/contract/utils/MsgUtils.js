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
    return new Promise((resolve, reject) => {
        getContract().methods.data(id).call().then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const getLikeCount = (id) => {
    return new Promise((resolve, reject) => {
        getContract().methods.getLikeCount(id).call().then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const getDiscussMsgLength = (id) => {
    return new Promise((resolve, reject) => {
        getContract().methods.getDiscussMsgLength(id).call().then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const isFavorite = (id) => {
    return new Promise((resolve, reject) => {
        getContract().methods.isFavorite(id).call().then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const favorite = (id) => {
    return new Promise((resolve, reject) => {
        getTX().then(tx => {
            txListener(getContract().methods.favorite(id), tx, resolve, reject)
        })
    })
}

export const discussMsg = (id, info, to) => {
    return new Promise((resolve, reject) => {
        getTX().then(tx => {
            txListener(getContract().methods.discussMsg(id, info, to), tx, resolve, reject)
        })
    })
}

export const getDiscussMsg = (id, index) => {
    return new Promise((resolve, reject) => {
        getContract().methods.getDiscussMsg(id, index).call().then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}