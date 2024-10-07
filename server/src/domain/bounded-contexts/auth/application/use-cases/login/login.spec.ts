import { InMemoryUserRepository } from "../../__tests__/repositories/user"
import { LoginUseCase } from "./login"
import { UserFactory } from "../../__tests__/factories/user"
import { some } from "@tests/utils/some"
import { InvalidCredentialsError } from "./errors/invalid-credentials"

describe('RegisterUserUseCase', () => {
  const userRepository = new InMemoryUserRepository()
  const userFactory = new UserFactory(userRepository)
  const sut = new LoginUseCase(userRepository)

  beforeEach(async () => {
    await userRepository.reset()
  })

  it('should get the authenticated token', async () => {
    const user = await userFactory.create()
    
    const response = await sut.execute({
      username: user.props.username,
      password: user.props.password,
    })

    expect(response).toEqual({
      accessToken: expect.any(String),
    })
  })

  it('should throw InvalidCredentialsError if the username does not exist', async () => {
    const user = await userFactory.create()

    await expect(async () => {
      await sut.execute({ username: some.text(), password: user.props.password })
    }).rejects.toThrowError(InvalidCredentialsError)
  })
})