'use strict';

const Controller = require('egg').Controller;
var crypto = require('crypto');
var mysql = require('mysql')
const koa2Req = require('koa2-request');

class EquipmentController extends Controller {
    //增加设备
    /**
     * 参数
     * 设备id  id  必填
     * name  string
     * userID  
     */
    async addEquipment() {
        const { ctx } = this;
        const equipmentInfo = ctx.request.body;
        ctx.logger.info('参数', equipmentInfo);
        const res = await ctx.service.admin.equipment.addEquipment(equipmentInfo);
        ctx.logger.info(res);
        ctx.body = res.message;
    }



    //查询设备
    async searchEquipment() {
        const { ctx } = this;
        ctx.logger.info(ctx.query);
        const res = await ctx.service.admin.equipment.searchEquipment(ctx.query);
        ctx.logger.info(res);
        ctx.body = res;
    }

    //修改设备
    async updateEquipment() {
        const { ctx } = this;
        const equipmentInfo = ctx.request.body;
        ctx.logger.info(equipmentInfo);
        const res = await ctx.service.admin.equipment.updateEquipment(equipmentInfo);
        ctx.logger.info(res);
        ctx.body = res;
    }

    //删除设备
    async delEquipment() {
        const { ctx } = this;
        const id = ctx.params.id;
        ctx.logger.info(id);
        const res = await ctx.service.admin.equipment.delEquipment(id);
        ctx.logger.info(res);
        ctx.body = res;
    }

    //获取数据
    async getData() {
        const { ctx } = this;
        ctx.logger.info(ctx.query);
        const res = await ctx.service.admin.equipment.getData(ctx.query);
        ctx.logger.info(res);
        ctx.body = res;
    }
    //获取激光数据
    async getDataJg() {
        const { ctx } = this;
        ctx.logger.info(ctx.query);
        const res = await ctx.service.admin.equipment.getDataJg(ctx.query);
        // ctx.logger.info(res);
        ctx.body = res;
    }
    //获取变形数据
    async getDataLf() {
        const { ctx } = this;
        ctx.logger.info(ctx.query);
        const res = await ctx.service.admin.equipment.getDataLf(ctx.query);
        ctx.logger.info(res);
        ctx.body = res;
    }

    //根据范围查询数据
    async searchData() {
        const { ctx } = this;
        ctx.logger.info(ctx.query);
        const res = await ctx.service.admin.equipment.searchData(ctx.query);
        ctx.logger.info(res);
        ctx.body = res;
    }
    //根据范围查询激光数据
    async searchDataJg() {
        const { ctx } = this;
        ctx.logger.info(ctx.query);
        const res = await ctx.service.admin.equipment.searchDataJg(ctx.query);
        ctx.logger.info(res);
        ctx.body = res;
    }
    //根据范围查询变形数据
    async searchDataLf() {
        const { ctx } = this;
        ctx.logger.info(ctx.query);
        const res = await ctx.service.admin.equipment.searchDataLf(ctx.query);
        ctx.logger.info(res);
        ctx.body = res;
    }

    //查询每小时的数据平均值
    async getDataHour() {
        const { ctx } = this;
        ctx.logger.info(ctx.query);
        const res = await ctx.service.admin.equipment.getDataHour(ctx.query);
        ctx.logger.info(res);
        ctx.body = res;
    }
    //查询每天的数据平均值
    async getDataDay() {
        const { ctx } = this;
        ctx.logger.info(ctx.query);
        const res = await ctx.service.admin.equipment.getDataDay(ctx.query);
        ctx.logger.info(res);
        ctx.body = res;
    }
    //查询激光每小时的数据平均值
    async getDataHourJg() {
        const { ctx } = this;
        ctx.logger.info(ctx.query);
        const res = await ctx.service.admin.equipment.getDataHourJg(ctx.query);
        ctx.logger.info(res);
        ctx.body = res;
    }
    //查询激光每天的数据平均值
    async getDataDayJg() {
        const { ctx } = this;
        ctx.logger.info(ctx.query);
        const res = await ctx.service.admin.equipment.getDataDayJg(ctx.query);
        ctx.logger.info(res);
        ctx.body = res;
    }

    //查询变形每小时的数据平均值
    async getDataHourLf() {
        const { ctx } = this;
        ctx.logger.info(ctx.query);
        const res = await ctx.service.admin.equipment.getDataHourLf(ctx.query);
        ctx.logger.info(res);
        ctx.body = res;
    }
    //查询变形每天的数据平均值
    async getDataDayLf() {
        const { ctx } = this;
        ctx.logger.info(ctx.query);
        const res = await ctx.service.admin.equipment.getDataDayLf(ctx.query);
        ctx.logger.info(res);
        ctx.body = res;
    }

    async weiLogin() {
        const { ctx } = this;
        const params = ctx.request.body;
        let code = params.code;//获取小程序传来的code
        let encryptedData = params.encryptedData;//获取小程序传来的encryptedData
        let iv = params.iv;//获取小程序传来的iv
        let appid = "wx1ac4f5f12283ad6f";//自己小程序后台管理的appid，可登录小程序后台查看
        let secret = "3ddb90e46204b300dda0a0f570f20018";//小程序后台管理的secret，可登录小程序后台查看
        let grant_type = "authorization_code";// 授权（必填）默认值

        //请求获取openid
        let url = "https://api.weixin.qq.com/sns/jscode2session?grant_type=" + grant_type + "&appid=" + appid + "&secret=" + secret + "&js_code=" + code;
        let openid, sessionKey;
        // 发送到微信服务器获取OpenId
        let qres = await await koa2Req({
            url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
        })
        let body = JSON.parse(qres.body); // 解析
        console.log('body', body)
        ctx.body = body // OpenId最好仅在服务端使用，不建议发送到客户端
        openid = body.openid;
        sessionKey = body.session_key;
        console.log(openid, sessionKey);
        var pc = new WXBizDataCrypt(appid, sessionKey);//这里的sessionKey 是上面获取到的
        var decodeData = pc.decryptData(encryptedData, iv);//encryptedData 是从小程序获取到的
        console.log('解密后 data: ', decodeData);
        ctx.body = decodeData;
        var sqlData = {
            openId: decodeData.openId
        }
        const res = await ctx.service.admin.equipment.weiLogin(sqlData)
        ctx.body = {
            res,
            sessionKey
        };
    }

    //删除openid
    async delOpenid() {
        const { ctx } = this;
        const id = ctx.params.id;
        ctx.logger.info(id);
        const res = await ctx.service.admin.equipment.delOpenid(id);
        ctx.logger.info(res);
        ctx.body = res;
    }

    //增加留言内容
    async addComment() {
        const { ctx } = this;
        const commentInfo = ctx.request.body;
        ctx.logger.info('参数', commentInfo);
        const res = await ctx.service.admin.equipment.addComment(commentInfo);
        ctx.logger.info(res);
        ctx.body = res.message;
    }

    //查询留言内容
    async searchComment() {
        const { ctx } = this;
        ctx.logger.info(ctx.query);
        const res = await ctx.service.admin.equipment.searchComment(ctx.query);
        ctx.logger.info(res);
        ctx.body = res;
    }


}

module.exports = EquipmentController;


function WXBizDataCrypt(appId, sessionKey) {
    this.appId = appId
    this.sessionKey = sessionKey
}
WXBizDataCrypt.prototype.decryptData = function (encryptedData, iv) {
    // base64 decode
    var sessionKey = new Buffer(this.sessionKey, 'base64')
    encryptedData = new Buffer(encryptedData, 'base64')
    iv = new Buffer(iv, 'base64')

    try {
        // 解密
        var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
        // 设置自动 padding 为 true，删除填充补位
        decipher.setAutoPadding(true)
        var decoded = decipher.update(encryptedData, 'binary', 'utf8')
        decoded += decipher.final('utf8')
        decoded = JSON.parse(decoded)
    } catch (err) {
        throw new Error('Illegal Buffer')
    }

    if (decoded.watermark.appid !== this.appId) {
        throw new Error('Illegal Buffer')
    }
    return decoded
}