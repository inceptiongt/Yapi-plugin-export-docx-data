# YAPI导出word文件插件
在平台”数据导出“下拉菜单增加”docx“选项，导出word文件
# 方案
docxtemplater模板渲染数据，生成word文件
# 数据格式
```javasrcript
{
        curProjectName: '',
        // 与“数据导出”-“json”，导出的json文件数据结构保持一致
        apis: [
                {
                        "index": 0,
                        "name": "公共分类",
                        "desc": "公共分类",
                        "add_time": 1551153428,
                        "up_time": 1551153428,
                        "list": [
                        {
                                "query_path": {
                                "path": "/api/test",
                                "params": []
                                },
                                "edit_uid": 0,
                                "status": "undone",
                                "type": "static",
                                "req_body_is_json_schema": true,
                                "res_body_is_json_schema": false,
                                "api_opened": false,
                                "index": 0,
                                "tag": [],
                                "_id": 11,
                                "method": "GET",
                                "catid": 11,
                                "title": "test",
                                "path": "/api/test",
                                "project_id": 11,
                                "req_params": [],
                                "res_body_type": "json",
                                "uid": 11,
                                "add_time": 1551159382,
                                "up_time": 1551249632,
                                "req_query": [
                                        {
                                        "required": "1",
                                        "_id": "5c7630e0aeb004607a9d5776",
                                        "name": "a",
                                        "desc": "啊啊"
                                        },
                                        {
                                        "required": "1",
                                        "_id": "5c7630e0aeb004607a9d5775",
                                        "name": "b",
                                        "example": "",
                                        "desc": "闭包"
                                        }
                                ],
                                "req_headers": [],
                                "req_body_form": [],
                                "__v": 0,
                                "desc": "",
                                "markdown": "",
                                "res_body": ""
                        }
                        ]
                }
        ],
        // 与“动态”页面，“/api/log/list”接口返回数据结构保持一致
        log: [
                {
                        add_time: 1551922145
                        content: ""
                        data: {interface_id: 790, cat_id: 168,…}
                        type: "project"
                        typeid: 63
                        uid: 13
                        username: "admin"
                        __v: 0
                        _id: 4261
                }
        ],
}
```
# TIPS
* input.docx模板文件需放在vendors目录下
* parser.js文件提供自定义tag及tag格式化功能，其中$index、$$index表示数组及嵌套数据索引值