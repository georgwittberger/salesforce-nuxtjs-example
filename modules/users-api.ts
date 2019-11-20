import { Module } from '@nuxt/types'
import consola from 'consola'
import { usersApi } from '../server/users/users-api'

export interface UsersApiConfig {
  prefix?: string
}

export const UsersApiModule: Module<UsersApiConfig> = function(config) {
  const path = (config && config.prefix ? config.prefix : '') + '/users'
  consola.info('Registering users API middleware...')
  this.addServerMiddleware({ path, handler: usersApi })
  consola.success(`Users API middleware registered at ${path}`)
}
