# 用户操作

> prefix: cms/user

## 用户注册 [Done]

``` http
POST    /cms/user/register
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
    "msg": ["邮箱或用户名已经被注册，请重新输入"]
}
```

## 用户登录 [DONE]

``` http
POST    /cms/account/login
```

### 参数说明

| 参数      | 说明     | 是否必填 |
| --------- | -------- | :------: |
| email  | 用户名     |    是    |
| password  | 密码     |    是    |

### 成功操作返回

``` json
{
    "code": 0,
    "msg": "success",
    "data": {}
}
```

### 失败操作返回

``` json
{
    "code": 10000,
    "msg": ["密码错误"]
}
```
