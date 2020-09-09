import { Rule, LinValidator } from './lin-validator'
import { UserDao } from '~/dao/user.dao'

const userDao = new UserDao()

class RegisterValidator extends LinValidator {
  constructor () {
    super()
    this.nickname = [
      new Rule('isNotEmpty', '用户名不可以为空'),
      new Rule('isLength', '用户名长度必须在2~20之间', 2, 20)
    ]
    this.email = [
      new Rule('isNotEmpty', '邮箱不能为空'),
      new Rule('isEmail', '电子邮箱不符合规范，请输入正确的邮箱')
    ]
    this.password1 = [
      new Rule(
        'matches',
        '密码长度必须在6~22位之间，包含字符、数字和 _ ',
        /^[A-Za-z0-9_*&$#@]{6,22}$/
      )
    ]
    this.password2 = [new Rule('isNotEmpty', '确认密码不能为空')]
  }

  validatePassword (values) {
    const pwd1 = values.body.password1
    const pwd2 = values.body.password2
    if (pwd1 !== pwd2) {
      return [false, '两次输入的密码不一致，请重新输入']
    }
  }

  async validateEmail (values) {
    const email = values.body.email
    const admin = await userDao.findUser({ email })
    if (admin) {
      return '邮箱已经被注册，请重新输入'
    }
  }
}

export { RegisterValidator }
