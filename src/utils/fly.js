import Fly from 'flyio/dist/npm/wx'
const fly = new Fly()
const host = "https://tts.api001.com"
fly.config.baseURL = host;


//添加响应拦截器
fly.interceptors.response.use(
    (response) => {
        return response.data;//请求成功之后将返回值返回
    },
    (err) => {
        if (err) {
            return "请求失败";
        };
    }
);

export default fly;
