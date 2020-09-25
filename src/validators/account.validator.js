import { Rule, LinValidator } from './lin-validator'

class LoginValidator extends LinValidator {
  constructor () {
    super()
    this.email = [
      new Rule('isNotEmpty', '邮箱不能为空'),
      new Rule('isEmail', '电子邮箱不符合规范，请输入正确的邮箱')
    ]
    this.password = [
      new Rule(
        'matches',
        '密码长度必须在6~22位之间，包含字符、数字和 _ ',
        /^[A-Za-z0-9_*&$#@]{6,22}$/
      )
    ]
  }
}

export { LoginValidator }
