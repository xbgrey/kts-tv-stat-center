import request from 'superagent';
import { Modal } from 'antd';
// import mock from './mock.json';

// const Domain     = 'http://test.channel-zuul.xltec.cc/';
// const DomainLong = 'http://test.api.xltec.cc/';

const Domain     = 'http://channel-zuul.kingxunlian.com/';
const DomainLong = 'https://api.kingxunlian.com/';


function threeInOne(type, uri, fnCallback, params, options = {}) {

    options = {
        'Content-Type':'application/json',
        ...options,
    }

    return request[type](uri)
        .set(options)[type === 'get' ? 'query' : 'send'](params)
        .end((err, res) => {
            //网络异常
            if (err) {
                Modal.error({ title: '请求异常' })
            } else {
                if (res.body.ok) {
                    fnCallback(err, res.body);
                } else {
                    Modal.error({ title: res.body.status.description || '系统错误' })
                    fnCallback(res.body, null);
                }
            }
        });
}

//服务器数据
export default class Server {

    static _instance;

    static get instance() {
        if (Server._instance) {
            return Server._instance;
        } else {
            return new Server();
        }
    }

    constructor() {
        if (Server._instance) {
            console.error('对象为单例');
        } else {
            Server._instance = this;
        }
    }

    //-----------------------------------------------
    login = (callback) => {
        const parameter = { loginName: 'kanban', password: 'kanban' };
        // const parameter = { loginName: 'helenzs_1', password: '123456' };

        const threeInOneCallback = (err, res)=>{
            if(err){
                callback(err);
                Modal.error({title:'请求失败'})
            }else{
                this.userInfo = res.body;
                callback(null, this.userInfo);
            }
        }

        threeInOne('post', DomainLong+'auth/login', threeInOneCallback, parameter);
    }

    queryInvoiceLibStatisticsByCondition = (callback, parameter={}) => {
        
        // callback(null, [mock,mock,mock,mock,mock,mock,mock,mock,mock]);

        const url = Domain+'invoice-lib-center/queryInvoiceLibStatisticsByCondition?pageNum=1&pageSize=9';

        parameter = {year: 2018, ...parameter};
        
        const options = {
            'kxl-userid':this.userInfo.user.userId,
            'kxl-token':this.userInfo.token,
        }

        const threeInOneCallback = (err, res)=>{
            if(err){
                Modal.error({title:'请求失败'})
                callback(err)
            }else{
                if(res.ok && res.body){
                    callback(null, res.body.rows);
                }else{
                    Modal.error({title:'请求失败'})
                    callback(res);
                }
            }
        }

        threeInOne('post', url, threeInOneCallback, parameter, options);
    }

    company = (callback)=>{
        const url = Domain+'channel-center/company/page?pageNum=1&pageSize=10000';

        const parameter = {}
        
        const options = {
            'kxl-userid':this.userInfo.user.userId,
            'kxl-token':this.userInfo.token,
        }

        const threeInOneCallback = (err, res)=>{
            if(err){
                Modal.error({title:'请求失败'})
                callback(err)
            }else{
                if(res.ok && res.body){
                    callback(null, res.body.rows);
                }else{
                    Modal.error({title:'请求失败'})
                    callback(res);
                }
            }
        }

        threeInOne('post', url, threeInOneCallback, parameter, options);
    }

    /**地图数据 */
    queryInvoiceLibNationalEreaStatistics = (callback) => {

        const url = Domain+'invoice-lib-center/queryInvoiceLibNationalEreaStatistics?pageSize=10000&pageNum=1';

        const parameter = {}
        
        const options = {
            'kxl-userid':this.userInfo.user.userId,
            'kxl-token':this.userInfo.token,
        }

        const threeInOneCallback = (err, res)=>{
            if(err){
                Modal.error({title:'请求失败'})
                callback(err)
            }else{
                if(res.ok && res.body){
                    callback(null, res.body.rows);
                }else{
                    Modal.error({title:'请求失败'})
                    callback(res);
                }
            }
        }

        threeInOne('post', url, threeInOneCallback, parameter, options);
    }
}
