const exportSwaggerController = require('./controller');

module.exports = function () {
  this.bindHook('add_router', (addRouter) => {
    addRouter({
      controller: exportSwaggerController,
      method: 'get',
      path: 'exportDocx',
      action: 'exportData',
    });
  });
};
