import { BCryptHashModule } from '@/adapters/hash/implementations/bycript'
import { JsonWebTokenJWTModule } from '@/adapters/jwt/implementations/json-web-token'
import { some } from '@tests/utils/some'

import { createUserData } from '../../__tests__/factories/user'
import { InMemoryUserRepository } from '../../__tests__/repositories/user'
import { RegisterUserUseCase } from '../register/register'
import { LoginUseCase } from './login'

describe('LoginUseCase:Integration', () => {
  const userRepository = new InMemoryUserRepository()
  const hashModule = new BCryptHashModule()
  const expirationTimeInMs = 1000
  const jwtModule = new JsonWebTokenJWTModule({
    secretKey: some.text(),
    expirationTimeInMs,
  })

  const registerUserUseCase = new RegisterUserUseCase(
    userRepository,
    hashModule,
  )
  const loginUseCase = new LoginUseCase(userRepository, hashModule, jwtModule)

  beforeEach(async () => {
    await userRepository.reset()
  })

  it('should integrate with RegisterUserUseCase', async () => {
    const password = some.text()
    const user = await registerUserUseCase.execute(
      createUserData({
        password,
      }),
    )

    const response = await loginUseCase.execute({
      username: user.props.username,
      password,
    })

    expect(response).toEqual({
      accessToken: expect.any(String),
    })
  })
})
