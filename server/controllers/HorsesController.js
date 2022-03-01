import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { horsesService } from "../services/HorsesService"

export class HorsesController extends BaseController {
  constructor() {
    super('api/horses')
    this.router
      .get('', this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      // .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
    // .put('', this.edit)
    // .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const horses = await horsesService.getAll(req.query)
      return res.send(horses)
    } catch (error) {
      next(error)
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
}
