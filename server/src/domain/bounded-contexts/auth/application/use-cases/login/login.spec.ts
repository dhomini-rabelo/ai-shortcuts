import { InMemoryUserRepository } from "../../__tests__/repositories/user"
import { LoginUseCase } from "./login"
import { UserFactory } from "../../__tests__/factories/user"
import { some } from "@tests/utils/some"
import { InvalidCredentialsError } from "./errors/invalid-credentials"
import { HashMock } from "@tests/mocks/adapters/hash"

describe('LoginUseCase', () => {
  const userRepository = new InMemoryUserRepository()
  const userFactory = new UserFactory(userRepository)
  const hashModule = new HashMock()
  const sut = new LoginUseCase(userRepository, hashModule)

  beforeEach(async () => {
    await userRepository.reset()
  })

  it('should get the authenticated token', async () => {
    const password = some.text()
    const user = await userFactory.create({
      password: hashModule.generate(password),
    })
    
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

  it('should throw InvalidCredentialsError if the password is incorrect', async () => {
    const user = await userFactory.create()

    await expect(async () => {
      await sut.execute({ username: user.props.username, password: some.text() })
    }).rejects.toThrowError(InvalidCredentialsError)
  })
})