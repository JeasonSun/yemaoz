import categoryModel from '~/models/category.model'

class CategoryDao {

  async save (data) {
    const { id } = data
    

    const category = await categoryModel.findById(id)
    let updatedCategory = {}
    if (category) {
      // 更新
      console.log('更新', category)
    } else {
      // 创建
      console.log('创建', category)
    }
    
    return updatedCategory
  }

  
}

export { CategoryDao }
