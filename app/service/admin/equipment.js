'use strict';

const Service = require('egg').Service;
const short = require('short-uuid');

class EquipmentService extends Service {
    //新增设备
    async addEquipment(equipmentInfo) {
        const { app } = this;
        const uuid = short.generate();
        equipmentInfo.id = uuid;
        //访问数据库
        const res = await app.mysql.insert('admin_equipment', equipmentInfo);
        return {
            code: res.affectedRows === 1 ? 200 : 400,
            message: res.affectedRows === 1 ? 'success' : 'fail'
        }
    }

    //查询设备
    async searchEquipment(params) {
        const { app } = this;
        const res = await app.mysql.select('admin_equipment', {
            where: params != null ? params : null
        })
        return {
            code: res.affectedRows === 1 ? 200 : 400,
            message: res.affectedRows === 1 ? 'success' : 'fail',
            res,
        }
    }

    //修改设备
    async updateEquipment(equipmentInfo) {
        const { app } = this;
        const options = {
            where: {
                id: equipmentInfo.id,
                equipmentType: equipmentInfo.equipmentType
            }
        };
        const res = await app.mysql.update('admin_equipment', equipmentInfo, options);
        return {
            code: res.affectedRows === 1 ? 200 : 400,
            message: res.affectedRows === 1 ? 'success' : 'fail'
        }
    }

    //删除设备
    async delEquipment(id) {
        const { app } = this;
        const res = await app.mysql.delete('admin_equipment', {
            id: id
        })
        return {
            code: res.affectedRows === 1 ? 200 : 400,
            message: res.affectedRows === 1 ? 'success' : 'fail'
        }
    }

    //SELECT * FROM buildingGateway ORDER BY this_time
    //获取数据
    async getData(params) {
        const { app } = this;
        console.log('params', params, JSON.stringify(params) != "{}");
        if (JSON.stringify(params) != "{}") {
            console.log('进来了1');
            const res = await app.mysql.query('select * from buildinggateway where parentId = ? order by this_time DESC LIMIT 10 ', [params.parentId])
            return {
                code: 200,
                message: 'success',
                res
            }
        } else {
            console.log('进来了2');
            const res = await app.mysql.query('select * from buildinggateway order by this_time')
            return {
                code: 200,
                message: 'success',
                res
            }
        }

        // const res = await app.mysql.select('buildinggateway', {
        //     where: params != null ? params : null
        // })

    }
    //获取激光数据
    async getDataJg(params) {
        const { app } = this;
        console.log('params', params, JSON.stringify(params) != "{}");
        if (JSON.stringify(params) != "{}") {
            console.log('进来了1');
            const res = await app.mysql.query('select * from jgdata where ID = ? order by this_time DESC LIMIT 10 ', [params.parentId])
            return {
                code: 200,
                message: 'success',
                res
            }
        } else {
            console.log('进来了2');
            const res = await app.mysql.query('select * from jgdata order by this_time')
            return {
                code: 200,
                message: 'success',
                res
            }
        }

        // const res = await app.mysql.select('buildinggateway', {
        //     where: params != null ? params : null
        // })

    }

    //获取变形数据
    async getDataLf(params) {
        const { app } = this;
        console.log('params', params, JSON.stringify(params) != "{}");
        if (JSON.stringify(params) != "{}") {
            console.log('进来了1');
            const res = await app.mysql.query('select * from lfdata where ID = ? order by this_time DESC LIMIT 10 ', [params.parentId])
            return {
                code: 200,
                message: 'success',
                res
            }
        } else {
            console.log('进来了2');
            const res = await app.mysql.query('select * from lfdata order by this_time')
            return {
                code: 200,
                message: 'success',
                res
            }
        }

        // const res = await app.mysql.select('buildinggateway', {
        //     where: params != null ? params : null
        // })

    }



    //const results = await this.app.mysql.query('update posts set hits = (hits + ?) where id = ?', [1, postId]);

    // => update posts set hits = (hits + 1) where id = 1;
    //SELECT * FROM cms_book_statistics WHERE update_time between '2017-09-27 00:00:00' and '2017-09-27 23:59:59'
    //根据范围查询数据
    async searchData(params) {
        const { app } = this;
        this.ctx.logger.info('params', params)
        const parentId = params.parentId;
        // let startDate = params.startDate + ' 00:00:00'
        let startDate = params.startDate
        // let endDate = params.endDate + ' 23:59:59'
        let endDate = params.endDate
        console.log(startDate, endDate)
        const res = await app.mysql.query('select * from buildinggateway where this_time between ? and ? and (parentId = ?) ORDER BY this_time', [startDate, endDate, parentId])
        return {
            code: 200,
            message: 'success',
            res
        }
    }
    //根据范围查询激光数据
    async searchDataJg(params) {
        const { app } = this;
        this.ctx.logger.info('params', params)
        const parentId = params.parentId;
        // let startDate = params.startDate + ' 00:00:00'
        let startDate = params.startDate
        // let endDate = params.endDate + ' 23:59:59'
        let endDate = params.endDate
        console.log(startDate, endDate)
        const res = await app.mysql.query('select * from jgdata where this_time between ? and ? and (ID = ?) ORDER BY this_time', [startDate, endDate, parentId])
        return {
            code: 200,
            message: 'success',
            res
        }
    }
    //根据范围查询变形数据
    async searchDataLf(params) {
        const { app } = this;
        this.ctx.logger.info('params', params)
        const parentId = params.parentId;
        // let startDate = params.startDate + ' 00:00:00'
        let startDate = params.startDate
        // let endDate = params.endDate + ' 23:59:59'
        let endDate = params.endDate
        console.log(startDate, endDate)
        const res = await app.mysql.query('select * from lfdata where this_time between ? and ? and (ID = ?) ORDER BY this_time', [startDate, endDate, parentId])
        return {
            code: 200,
            message: 'success',
            res
        }
    }

    //查询每小时的数据平均值
    async getDataHour(params) {
        const { app } = this;
        this.ctx.logger.info('params', params)
        const parentId = params.parentId;
        let sql = `SELECT AVG(windSpeed) AS windSpeed,AVG(noise) AS noise,AVG(pmValue) AS pmValue,AVG(harmfulGas1) AS harmfulGas1,AVG(harmfulGas2) AS harmfulGas2,AVG(temperature) AS temperature,AVG(humidity) AS humidity,AVG(accelerationX) AS accelerationX,AVG(accelerationY) AS accelerationY,AVG(accelerationZ) AS accelerationZ,DATE_FORMAT(this_time,'%Y-%m-%d %H') as this_time FROM buildinggateway 
        where parentId = ${parentId} GROUP BY YEAR(this_time),MONTH(this_time),DAY(this_time),HOUR(this_time) ORDER BY this_time`
        const res = await app.mysql.query(sql)
        return {
            code: 200,
            message: 'success',
            res
        }
    }

    //查询每天的数据平均值
    async getDataDay(params) {
        const { app } = this;
        this.ctx.logger.info('params', params)
        const parentId = params.parentId;
        let sql = `SELECT AVG(windSpeed) AS windSpeed,AVG(noise) AS noise,AVG(pmValue) AS pmValue,AVG(harmfulGas1) AS harmfulGas1,AVG(harmfulGas2) AS harmfulGas2,AVG(temperature) AS temperature,AVG(humidity) AS humidity,AVG(accelerationX) AS accelerationX,AVG(accelerationY) AS accelerationY,AVG(accelerationZ) AS accelerationZ,DATE_FORMAT(this_time,'%Y-%m-%d') as this_time FROM buildinggateway 
        where parentId = ${parentId} GROUP BY YEAR(this_time),MONTH(this_time),DAY(this_time) ORDER BY this_time`
        const res = await app.mysql.query(sql)
        return {
            code: 200,
            message: 'success',
            res
        }
    }

    //查询激光每小时的数据平均值
    async getDataHourJg(params) {
        const { app } = this;
        this.ctx.logger.info('params', params)
        const parentId = params.parentId;
        let sql = `SELECT AVG(X) AS X,AVG(Y) AS Y,AVG(Z) AS Z,DATE_FORMAT(this_time,'%Y-%m-%d %H') as this_time FROM jgdata 
        where ID = ${parentId} GROUP BY YEAR(this_time),MONTH(this_time),DAY(this_time),HOUR(this_time) ORDER BY this_time`
        const res = await app.mysql.query(sql)
        return {
            code: 200,
            message: 'success',
            res
        }
    }

    //查询激光每天的数据平均值
    async getDataDayJg(params) {
        const { app } = this;
        this.ctx.logger.info('params', params)
        const parentId = params.parentId;
        let sql = `SELECT AVG(X) AS X,AVG(Y) AS Y,AVG(Z) AS Z,DATE_FORMAT(this_time,'%Y-%m-%d') as this_time FROM jgdata 
        where ID = ${parentId} GROUP BY YEAR(this_time),MONTH(this_time),DAY(this_time) ORDER BY this_time`
        const res = await app.mysql.query(sql)
        return {
            code: 200,
            message: 'success',
            res
        }
    }

    //查询变形每小时的数据平均值
    async getDataHourLf(params) {
        const { app } = this;
        this.ctx.logger.info('params', params)
        const parentId = params.parentId;
        let sql = `SELECT AVG(X001) AS X001,AVG(X002) AS X002,AVG(X003) AS X003,AVG(X004) AS X004,DATE_FORMAT(this_time,'%Y-%m-%d %H') as this_time FROM lfdata 
        where ID = ${parentId} GROUP BY YEAR(this_time),MONTH(this_time),DAY(this_time),HOUR(this_time) ORDER BY this_time`
        const res = await app.mysql.query(sql)
        return {
            code: 200,
            message: 'success',
            res
        }
    }
    //查询变形每天的数据平均值
    async getDataDayLf(params) {
        const { app } = this;
        this.ctx.logger.info('params', params)
        const parentId = params.parentId;
        let sql = `SELECT AVG(X001) AS X001,AVG(X002) AS X002,AVG(X003) AS X003,AVG(X004) AS X004,DATE_FORMAT(this_time,'%Y-%m-%d') as this_time FROM lfdata 
        where ID = ${parentId} GROUP BY YEAR(this_time),MONTH(this_time),DAY(this_time) ORDER BY this_time`
        const res = await app.mysql.query(sql)
        return {
            code: 200,
            message: 'success',
            res
        }
    }

    async weiLogin(params) {
        const { app } = this;
        const userId = short.generate();
        params.id = userId;
        const res = await app.mysql.insert('login_wei', params);
        return {
            code: 200,
            message: 'success',
            id: params.id
        }
    }

    //删除openid
    async delOpenid(id) {
        const { app } = this;
        const res = await app.mysql.delete('login_wei', {
            id: id
        })
        return {
            code: 200,
            message: 'success'
        }
    }

    //增加留言
    async addComment(commentInfo) {
        const { app } = this;
        const uuid = short.generate();
        commentInfo.uuid = uuid;
        //访问数据库
        const res = await app.mysql.insert('comment', commentInfo);
        return {
            code: res.affectedRows === 1 ? 200 : 400,
            message: res.affectedRows === 1 ? 'success' : 'fail'
        }
    }

    //查询留言
    async searchComment(params) {
        const { app } = this;
        // const res = await app.mysql.select('comment', {
        //     where: params != null ? params : null
        // })
        const res = await app.mysql.query('select * from comment ORDER BY this_time')
        return {
            code: res.affectedRows === 1 ? 200 : 400,
            message: res.affectedRows === 1 ? 'success' : 'fail',
            res,
        }
    }

}
module.exports = EquipmentService;
