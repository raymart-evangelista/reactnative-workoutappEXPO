// src/models/User.js
import Realm from 'realm'

export class User extends Realm.Object {
  static schema = {
    name: 'User',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      firstName: 'string',
      lastName: 'string',
      email: 'string',
      googleId: 'string?',
      programs: 'Program[]',
    },
  }
}
