'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.get('/', controller.home.index);
  /**管理端 */
  /**设备 */
  //增加设备
  router.post('/admin/addEquipment', controller.admin.equipment.addEquipment);
  //查询设备
  router.get('/admin/searchEquipment', controller.admin.equipment.searchEquipment)
  //修改设备
  router.put('/admin/updateEquipment', controller.admin.equipment.updateEquipment)
  //删除设备
  router.delete('/admin/delEquipment/:id', controller.admin.equipment.delEquipment)

  /**用户*/
  //增加用户
  router.post('/admin/addUser', controller.admin.user.addUser);
  //查询用户
  router.get('/admin/searchUser', controller.admin.user.searchUser);
  //修改用户
  router.put('/admin/updateUser', controller.admin.user.updateUser);
  //删除用户
  router.delete('/admin/delUser/:id', controller.admin.user.delUser)

  /**获取数据 */
  router.get('/admin/getData', controller.admin.equipment.getData)
  //根据时间范围查询数据
  router.get('/admin/searchData', controller.admin.equipment.searchData)
  //查询每小时的数据平均值
  router.get('/admin/getDataHour', controller.admin.equipment.getDataHour)
  //查询每天的数据平均值
  router.get('/admin/getDataDay', controller.admin.equipment.getDataDay)

  /**获取激光设备数据 */
  router.get('/admin/getDataJg', controller.admin.equipment.getDataJg)
  //根据时间范围查询激光数据
  router.get('/admin/searchDataJg', controller.admin.equipment.searchDataJg)
  //查询激光设备每小时的数据平均值
  router.get('/admin/getDataHourJg', controller.admin.equipment.getDataHourJg)
  //查询激光设备每天的数据平均值
  router.get('/admin/getDataDayJg', controller.admin.equipment.getDataDayJg)

  /**获取变形设备数据 */
  router.get('/admin/getDataLf', controller.admin.equipment.getDataLf)
  //根据时间范围查询变形数据
  router.get('/admin/searchDataLf', controller.admin.equipment.searchDataLf)
  //查询变形设备每小时的数据平均值
  router.get('/admin/getDataHourLf', controller.admin.equipment.getDataHourLf)
  //查询变形设备每天的数据平均值
  router.get('/admin/getDataDayLf', controller.admin.equipment.getDataDayLf)

  //管理员信息  
  router.get('/admin/searchAdmin', controller.admin.user.searchAdmin)
  //检查管理员密码与手机号是否对应
  router.post('/admin/checkpwd', controller.admin.user.checkpwd)
  //检查用户密码与手机号是否对应
  router.post('/admin/checkUserpwd', controller.admin.user.checkUserpwd)

  //微信登录接口
  router.post('/admin/weiLogin', controller.admin.equipment.weiLogin)
  //删除openid
  router.delete('/admin/delOpenid/:id', controller.admin.equipment.delOpenid)

  //新增留言内容
  router.post('/admin/addComment', controller.admin.equipment.addComment);
  //查看留言内容
  router.get('/admin/searchComment', controller.admin.equipment.searchComment)
};
