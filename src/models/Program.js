import Realm from 'realm'

export class Program extends Realm.Object {
  static schema = {
    name: 'Program',
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      // exercises: { type: 'object' },
    },
  }
}
