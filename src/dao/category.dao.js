import categoryModel from '~/models/category.model'
import moment from 'moment'
import { getRepos } from '~/tasks/yuque'

class CategoryDao {
  async save (data) {
    const { id, ...rest } = data
    const category = await categoryModel.findById(id)
    let updatedCategory = category
    if (category) {
      const yuqueLastDate = moment(data.updated_at).toString()
      const yemaozLastDate = moment(category.updated_at).toString()
      // 如果上次更新时间和本次不相同，需要更新
      if (yuqueLastDate !== yemaozLastDate) {
        updatedCategory = categoryModel.update({_id:id}, { dirty: 1, ...rest })
        console.log('更新', category)
      } else {
        console.log('不需要更新')
      }
    } else {
      // 创建
      console.log('创建', category)
      updatedCategory = categoryModel.create({ _id: id, ...rest })
    }
    return updatedCategory
  }

  async findById (id) {
    // const user = usersModel.find({});
    // console.log(where)
    const cate = await categoryModel.findById(id)
    return cate
  }


  async fetchList () {
    const repos = await getRepos()
    const list = (repos && repos.data) || []
    const allList = await Promise.all(
      list.map(cate => {
        return this.save(cate)
      })
    )
    return allList
  }
}

export { CategoryDao }
