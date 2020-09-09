# 管理员

```
prefix: admin
router.get('/users/list', Users.list)
router.post('/users/create', Users.create)
router.get('/users/:id', Users.one)
router.put('/users/:id', Users.update)
router.delete('/users/:id', Users.remove)
```

## 管理员注册

> 部署线上建议屏蔽掉此注册接口

```
POST    /admin/users/create
```

### 参数说明

| 参数      | 说明     | 是否必填 |
| --------- | -------- | :------: |
| nickname  | 昵称     |    是    |
| email     | 邮箱     |    是    |
| password1 | 密码     |    是    |
| password2 | 确认密码 |    是    |

### 成功操作返回

```json
{
  "msg": "注册成功",
  "code": 200,
  "errorCode": 0
}
```
