'use strict';

const Service = require('egg').Service;
const short = require('short-uuid');
//const moment = require('moment');

class UserService extends Service {
    //增加用户
    async addUser(userInfo) {
        const { app } = this;
        //自动生成一个id
        const userId = short.generate();
        //时间
        //const current_time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        //将id添加到用户信息中
        userInfo.id = userId;
        //userInfo.time = current_time;
        //访问数据库
        const res = await app.mysql.insert('admin_user', userInfo);
        return {
            code: res.affectedRows === 1 ? 200 : 400,
            message: res.affectedRows === 1 ? 'success' : 'fail'
        }
    }

    //查询用户
    async searchUser(params) {
        const { app } = this;
        const res = await app.mysql.select('admin_user', {
            where: params != null ? params : null
        })
        return {
            code: res.affectedRows === 1 ? 200 : 400,
            message: res.affectedRows === 1 ? 'success' : 'fail',
            res
        }
    }

    //修改用户
    async updateUser(userInfo) {
        const { app } = this;
        const options = {
            where: {
                id: userInfo.id
            }
        };
        const res = await app.mysql.update('admin_user', userInfo, options);
        return {
            code: res.affectedRows === 1 ? 200 : 400,
            message: res.affectedRows === 1 ? 'success' : 'fail'
        }
    }

    //删除用户
    async delUser(id) {
        const { app } = this;
        const res = await app.mysql.delete('admin_user', {
            id: id
        })
        return {
            code: res.affectedRows === 1 ? 200 : 400,
            message: res.affectedRows === 1 ? 'success' : 'fail'
        }
    }

    //查询管理员
    async searchAdmin(params) {
        const { app } = this;
        const res = await app.mysql.select('admin', {
            where: params != null ? params : null
        })
        return {
            code: res.affectedRows === 1 ? 200 : 400,
            message: res.affectedRows === 1 ? 'success' : 'fail',
            res
        }
    }

    //检查管理员手机号密码是否对应
    async checkpwd(adminInfo) {
        const { app } = this;
        const res = await app.mysql.select('admin', {
            where: adminInfo
        })
        return {
            code: 200,
            message: 'success',
            res
        }
    }

    //检查用户手机号密码是否对应
    async checkUserpwd(userInfo) {
        const { app } = this;
        const res = await app.mysql.select('admin_user', {
            where: userInfo
        })
        return {
            code: 200,
            message: 'success',
            res
        }
    }

}

module.exports = UserService;
