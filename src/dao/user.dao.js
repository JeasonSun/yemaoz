import usersModel from '~/models/users.model'
import { Existing } from '~/plugin/http-exception'

class UserDao {
  async findUser (where) {
    console.log(where)
    const user = await usersModel.findOne({
      where
    })
    return user
  }


  async save(ctx, params){
    const {email, password, nickname} = params
    const user = this.findUser({
      email
    })
    if(user){
      throw new Existing('用户已经存在')
    }
    


  }
}

export { UserDao }
