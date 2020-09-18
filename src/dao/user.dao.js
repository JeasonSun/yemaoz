import usersModel from '~/models/users.model'
import { Existing } from '~/plugin/http-exception'

class UserDao {
  async findUser (where) {
    // const user = usersModel.find({});
    // console.log(where)
    const user = await usersModel.findOne(where).lean()
    console.log(user, '获取用户')
    return user
  }

  async save (data) {
    const { email,username } = data
    console.log('save 保存用户');
    const user = await this.findUser({
      email,
      username
    })
    if (user) {
      throw new Existing('用户已经存在')
    }
    const result = await usersModel.create(data)
    return {
      email: result.email,
      username: result.username
    }
  }
}

export { UserDao }
