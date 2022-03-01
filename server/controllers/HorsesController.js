import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { horsesService } from "../services/HorsesService"
import { Forbidden } from "../utils/Errors"

export class HorsesController extends BaseController {
  constructor() {
    super('api/horses')
    this.router
      .get('', this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      // .put('', this.edit)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const horses = await horsesService.getAll(req.query)
      return res.send(horses)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const horse = await horsesService.getById(req.params.id)
      return res.send(horse)
    } catch (error) {
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const horse = await horsesService.create(req.body)
      res.send(horse)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const update = await horsesService.edit(req.body)
      return res.send(update)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const userId = req.userInfo.id
      const horseId = req.params.id
      await horsesService.remove(horseId, userId)
      return res.send('Delorted Horsey')
    } catch (error) {
      next(error)
    }
  }


}
