import express from 'express'

export const usersApi = express()

usersApi.get('/current', (request, response) => {
  if (request.user)
    response.status(200).json({
      username: request.user.username,
      firstName: request.user.firstName,
      lastName: request.user.lastName
    })
  else response.status(401)
})
