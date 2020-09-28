import { Rule, LinValidator } from './lin-validator'

class RequiredValidator extends LinValidator {
  constructor (requiresArr = []) {
    super()
    requiresArr.forEach(key => {
      this[key] = [
        new Rule('isNotEmpty', `${key}不能为空`)
      ]
    })
  }
}

export { RequiredValidator }
