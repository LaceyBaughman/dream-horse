import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class HorsesService {

  async getAll(query = {}) {
    const horses = await dbContext.Horses.find(query)
    return horses
  }

  async create(body) {
    const horse = await dbContext.Horses.create(body)
    return horse
  }


}


export const horsesService = new HorsesService()
