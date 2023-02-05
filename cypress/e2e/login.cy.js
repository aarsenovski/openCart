import user from '../fixtures/userRegister.json'
import loginPage from '../pages/login'

describe('test login functionality', () => {
  it('should login an existing user', () => {
    loginPage.login(user)
  })
})
