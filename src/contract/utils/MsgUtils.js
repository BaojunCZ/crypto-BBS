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