import { Module } from '@nuxt/types'
import axios from 'axios'
import consola from 'consola'
import express from 'express'
import passport from 'passport'
import OAuth2Strategy from 'passport-oauth2'

export interface OAuth2Config {
  authorizationURL: string
  tokenURL: string
  userInfoURL: string
  clientID: string
  clientSecret: string
}

export interface UserInfo {
  userId: string
  orgId: string
  username: string
  email: string
  firstName: string
  lastName: string
  language: string
  locale: string
  accessToken: string
}

declare global {
  namespace Express {
    interface User extends UserInfo {}
  }
}

export const OAuth2Module: Module<OAuth2Config> = function(config) {
  if (!config || !config.authorizationURL) {
    throw new Error('Authorization URL missing in OAuth2 configuration')
  }
  if (!config || !config.tokenURL) {
    throw new Error('Token URL missing in OAuth2 configuration')
  }
  if (!config || !config.userInfoURL) {
    throw new Error('User info URL missing in OAuth2 configuration')
  }
  if (!config || !config.clientID) {
    throw new Error('Client ID missing in OAuth2 configuration')
  }
  if (!config || !config.clientSecret) {
    throw new Error('Client secret missing in OAuth2 configuration')
  }

  consola.info('Registering OAuth2 middleware...')

  passport.use(
    new OAuth2Strategy(
      {
        authorizationURL: config.authorizationURL,
        tokenURL: config.tokenURL,
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        scope: ['profile'],
        callbackURL: '/login/callback'
      },
      (accessToken: any, refreshToken: any, profile: any, done: (error: Error | null, user?: UserInfo) => void) => {
        axios
          .get(config.userInfoURL, {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${accessToken}`
            }
          })
          .then(({ data }) => {
            const user: UserInfo = {
              userId: data.user_id,
              orgId: data.organization_id,
              username: data.preferred_username,
              email: data.email,
              firstName: data.given_name,
              lastName: data.family_name,
              language: data.language,
              locale: data.locale,
              accessToken
            }
            done(null, user)
          })
          .catch(error => {
            done(error)
          })
      }
    )
  )

  passport.serializeUser((user: UserInfo, done) => done(null, user))
  passport.deserializeUser((user: UserInfo, done) => done(null, user))

  this.addServerMiddleware(passport.initialize())
  this.addServerMiddleware(passport.session())

  const loginRoutes = express()
  loginRoutes.get('/login', passport.authenticate('oauth2'))
  loginRoutes.get('/login/callback', passport.authenticate('oauth2'), (request, response) => {
    response.redirect('/')
  })
  this.addServerMiddleware(loginRoutes)

  consola.success('OAuth2 middleware registered')
}
