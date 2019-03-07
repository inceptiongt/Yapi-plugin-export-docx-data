function parse(tag) {
  // console.log(tag)
  return {
    get(scope, context) {
      if (tag === '$index') {
        const indexes = context.scopePathItem;
        return indexes[indexes.length - 1] + 1;
      }
      if (tag === '$$index') {
        const indexes = context.scopePathItem;
        return indexes[indexes.length - 2] + 1;
      }
      if (tag === 'isGET') {
        return scope.method === 'GET';
      }
      if (tag === 'isJson') {
        return scope.req_body_type === 'json';
      }
      if (tag === 'isForm') {
        return scope.req_body_type === 'form';
      }
      if (tag === 'required') {
        return scope[tag] === '1' ? 'Y' : 'N';
      }
      if (tag === '$content') {
        return scope.content.replace(/<[^>]+>/g, '');
      }
      if (tag === '$add_time') {
        return new Date(parseInt(scope.add_time, 10) * 1000).toLocaleString();
      }
      if (tag === '$indexLog') {
        return context.scopeList[0].apis.length + 1;
        // return 1
      }
      return scope[tag];
    },
  };
}
module.exports = parse;
