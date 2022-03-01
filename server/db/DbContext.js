import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { HorseSchema } from '../models/Horse'

class DbContext {
  Horses = mongoose.model('Horse', HorseSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
}

export const dbContext = new DbContext()
