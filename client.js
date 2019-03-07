function exportData(exportDataModule, pid) {
  exportDataModule.docx = {
    name: 'docx',
    route: `/api/plugin/exportDocx?type=json&pid=${pid}`,
    desc: '导出项目接口文档为docx文件',
  };
}

module.exports = function () {
  this.bindHook('export_data', exportData);
};
