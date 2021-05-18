'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    //增加用户信息
    async addUser() {
        const { ctx } = this;
        const userInfo = ctx.request.body;
        ctx.logger.info(userInfo);
        const res = await ctx.service.admin.user.addUser(userInfo);
        ctx.logger.info(res);
        ctx.body = res;
    }

    //查询用户
    async searchUser() {
        const { ctx } = this;
        ctx.logger.info(ctx.query);
        const res = await ctx.service.admin.user.searchUser(ctx.query);
        ctx.logger.info(res);
        ctx.body = res;
    }

    //修改用户
    async updateUser() {
        const { ctx } = this;
        const userInfo = ctx.request.body;
        ctx.logger.info(userInfo);
        const res = await ctx.service.admin.user.updateUser(userInfo);
        ctx.logger.info(res);
        ctx.body = res;
    }

    //删除用户
    async delUser() {
        const { ctx } = this;
        const id = ctx.params.id;
        ctx.logger.info(id);
        const res = await ctx.service.admin.user.delUser(id);
        ctx.logger.info(res);
        ctx.body = res;
    }

    //查询管理员信息
    async searchAdmin() {
        const { ctx } = this;
        const res = await ctx.service.admin.user.searchAdmin(ctx.query);
        ctx.body = res;
    }

    //检查管理员手机号密码是否对应
    async checkpwd() {
        const { ctx } = this;
        const adminInfo = ctx.request.body;
        const res = await ctx.service.admin.user.checkpwd(adminInfo)
        ctx.body = res;
    }

    //检查用户手机号密码是否对应
    async checkUserpwd() {
        const { ctx } = this;
        const userInfo = ctx.request.body;
        const res = await ctx.service.admin.user.checkUserpwd(userInfo)
        ctx.body = res;
    }

}

module.exports = UserController;
