/**
 * Created by 包俊 on 2018/9/6.
 */
import {getPlayer} from "../contract/utils/UserInfoUtils";

export const checkPlayer = (address) => {
    return new Promise((resolve, reject) => {
        getPlayer(address).then((player) => {
            console.log(player)
            if (player.playerAddress.toLowerCase() === address.toLowerCase()) {
                resolve(player)
            } else {
                reject("未注册")
            }
        }).catch(err => {
            reject(err)
        })
    })
}