'use strict'

import BaseResource from './../BaseResource'

/**
 * @class
 * @example
 * var client = new cloudesire.Client()
 * var usersPromise = client.user.all()
 * var aUserPromise = client.user.one(2)
 */
class User extends BaseResource {
  constructor(self) {
    super(self)
    this.path = 'user'
  }
}

export default User
