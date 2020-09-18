# 管理员

> prefix: cms/admin

## 管理员注册 [Done]

> 部署线上建议屏蔽掉此注册接口

``` http
POST    /cms/admin/create
```

### 参数说明

| 参数      | 说明     | 是否必填 |
| --------- | -------- | :------: |
| username  | 用户名     |    是    |
| email     | 邮箱     |    是    |
| password1 | 密码     |    是    |
| password2 | 确认密码 |    是    |
| nickname  | 昵称     |    否    |

### 成功操作返回

``` json
{
    "code": 0,
    "msg": "success",
    "data": {
        "email": "admin@qq.com",
        "username": "admin"
    }
}
```

### 失败操作返回

``` json
{
    "code": 10000,
    "msg": [
        "邮箱或用户名已经被注册，请重新输入"
    ]
}
```
