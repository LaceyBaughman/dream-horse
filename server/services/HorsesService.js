import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class HorsesService {

  async getAll(query = {}) {
    const horses = await dbContext.Horses.find(query)
    return horses
  }

  async getById(id) {
    const horse = await dbContext.Horses.findById(id)
    if (!horse) {
      throw new BadRequest('invalid horse id')
    }
    return horse
  }

  async create(body) {
    const horse = await dbContext.Horses.create(body)
    return horse
  }

  async remove(horseId, userId) {
    const horse = await this.getById(horseId)
    if (horse.creatorId.toString() !== userId) {
      throw new Forbidden('No touchy the horsey!')
    }
    await dbContext.Horses.findByIdAndDelete(horseId)
  }
}


export const horsesService = new HorsesService()
