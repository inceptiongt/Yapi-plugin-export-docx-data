# YAPI导出word文件插件
在平台”数据导出“下拉菜单增加”docx“选项，导出word文件
# 方案
docxtemplater模板渲染数据，生成word文件
# 数据格式
```javasrcript
{
        curProjectName: '',
        apis: [],
        log: [],
}
```
# TIPS
parser.js文件提供自定义tag及tag格式化功能，其中$index、$$index表示数组及嵌套数据索引值