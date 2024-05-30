import Realm from 'realm'

export class Program extends Realm.Object {
  static schema = {
    name: 'Program',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      title: 'string',
      description: 'string',
      weeks: 'Week[]',
      creator: 'User',
    },
  }
}

export class Sets extends Realm.Object {
  static schema = {
    name: 'Sets',
    properties: {
      single: 'int?',
      min: 'int?',
      max: 'int?',
      useRange: 'bool',
    },
  }
}

export class Reps extends Realm.Object {
  static schema = {
    name: 'Reps',
    properties: {
      single: 'int?',
      min: 'int?',
      max: 'int?',
      useRange: 'bool',
    },
  }
}

export class RPE extends Realm.Object {
  static schema = {
    name: 'RPE',
    properties: {
      single: 'int?',
      min: 'int?',
      max: 'int?',
      useRange: 'bool',
    },
  }
}

export class Exercise extends Realm.Object {
  static schema = {
    name: 'Exercise',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      warmup: 'Sets',
      working: 'Sets',
      reps: 'Reps',
      rpe: 'RPE',
    },
  }
}

export class Day extends Realm.Object {
  static schema = {
    name: 'Day',
    properties: {
      _id: 'objectId',
      title: 'string',
      description: 'string',
      exercises: 'Exercise[]',
    },
  }
}

export class Week extends Realm.Object {
  static schema = {
    name: 'Week',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      title: 'string',
      description: 'string',
      exercises: 'Day[]',
    },
  }
}
