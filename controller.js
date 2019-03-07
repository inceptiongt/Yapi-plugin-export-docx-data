/* eslint-disable */
const baseController = require('controllers/base.js');
const interfaceModel = require('models/interface.js');
const projectModel = require('models/project.js');
const interfaceCatModel = require('models/interfaceCat.js');
const logModel = require('models/log.js');
const yapi = require('yapi.js');
const toDocx = require('./json2docx');
/* eslint-enable */

function handleExistId(data) {
  function delArrId(arr, fn) {
    if (!Array.isArray(arr)) return;
    arr.forEach((item) => {
      /* eslint no-param-reassign: ["error", { "props": false }], no-underscore-dangle:[0] */
      delete item._id;
      delete item.__v;
      delete item.uid;
      delete item.edit_uid;
      delete item.catid;
      delete item.project_id;

      if (typeof fn === 'function') fn(item);
    });
  }

  delArrId(data, (item) => {
    delArrId(item.list, (api) => {
      delArrId(api.req_body_form);
      delArrId(api.req_params);
      delArrId(api.req_query);
      delArrId(api.req_headers);
      if (api.query_path && typeof api.query_path === 'object') {
        delArrId(api.query_path.params);
      }
    });
  });

  return data;
}

class exportController extends baseController {
  constructor(ctx) {
    super(ctx);
    this.catModel = yapi.getInst(interfaceCatModel);
    this.interModel = yapi.getInst(interfaceModel);
    this.projectModel = yapi.getInst(projectModel);
    this.logModel = yapi.getInst(logModel);
  }

  async handleListClass(pid, status) {
    const result = await this.catModel.list(pid);
    const newResult = [];
    for (let i = 0, item, list; i < result.length; i += 1) {
      item = result[i].toObject();
      list = await this.interModel.listByInterStatus(item._id, status);
      list = list.sort((a, b) => a.index - b.index);
      if (list.length > 0) {
        item.list = list;
        newResult.push(item);
      }
    }

    return newResult;
  }

  async exportData(ctx) {
    const { pid } = ctx.request.query;
    const { status } = ctx.request.query;

    if (!pid) {
      ctx.body = yapi.commons.resReturn(null, 200, 'pid 不为空');
    }
    let curProject;
    let tp = '';
    try {
      curProject = await this.projectModel.get(pid);
      ctx.set('Content-Type', 'application/octet-stream');
      const list = await this.handleListClass(pid, status);
      const data = handleExistId(list);
      const log = await this.logModel.listWithPaging(pid, 'project', 1, 10000);
      // console.log(log)
      tp = JSON.stringify({
        curProjectName: `${curProject.name}接口文档`,
        apis: data,
        log,
      }, null, 2);
      ctx.set('Content-Disposition', `attachment; filename=${encodeURI(`${curProject.name}接口文档`)}.docx`);
      // ctx.set('Content-Type', 'application/json');
      const rst = toDocx(tp);
      return (ctx.body = rst);
    } catch (error) {
      yapi.commons.log(error, 'error');
      ctx.body = yapi.commons.resReturn(null, 502, '下载出错');
    }
  }
}

module.exports = exportController;
