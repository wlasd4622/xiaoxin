import fly from '../utils/fly'

/**
 * 配音师列表
 * 直接Get请求即可，数据用于试听及配音师选择
 * @param {*} params 
 */
let peiYinShiList = params => {
    return fly.request({
        url: '/tts/list_peiyinshi'
    })
}

/**
 * 背景音乐接口
 * 如果返回为空，则配音界面不显示选择背景音乐的选项
 * @param {*} params 
 */
let listBgMusic = params => {
    return fly.request({
        method: 'get',
        url: '/tts/list_bgmusic'
    })
}
/**
 * 卡密查询接口
 * 这个接口用于我的->卡密管理
 * @param {*} params 
 */
let checkSn = id => {
    return fly.request({
        method: 'get',
        url: `/tts/check_sn/${id}`
    })
}
/**
 * 配音提交接口
 * form中增加了一个项目：bg_music_no
 * 当用户选择了背景音乐的时候，就传来，否则就传0
 * @param {*} params 
 */
let taskAdd = params => {
    return fly.request({
        method: 'POST',
        url: '/tts/taskadd',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params
    })
}
/**
 * 查询配音是否成功接口
 * 入传和之前的相比，没变。
 * 返回，增加了：
 * mp4_url（用于下载配音）
 * 原来的：download_url，字段，还是用于试听配音结果
 * @param {*} params 
 */
let taskStatus = taskId => {
    return fly.request({
        method: 'get',
        url: `/tts/task/${taskId}`
    })
}
export default {
    peiYinShiList,
    listBgMusic,
    checkSn,
    taskAdd,
    taskStatus
}