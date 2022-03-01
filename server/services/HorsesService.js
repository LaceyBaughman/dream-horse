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
  async edit(update) {
    const original = await this.getById(update.id)
    if (original.creatorId.toString() !== update.creatorId) {
      throw new Forbidden('This isn\t your dream horse... yet.')
    }
    original.breed = update.breed ? update.breed : original.breed
    original.color = update.color ? update.color : original.color
    original.height = update.height ? update.height : original.height
    original.year = update.year ? update.year : original.year
    original.price = update.price ? update.price : original.price
    original.imgUrl = update.imgUrl ? update.imgUrl : original.imgUrl
    original.description = update.description ? update.description : original.description

    await original.save({ runValidators: true })
    return original
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
