import { some } from "@tests/utils/some"
import { RegisterUserUseCase } from "./register"
import { User } from "../../../enterprise/entities/user"
import { InMemoryUserRepository } from "../../__tests__/repositories/user"
import { UserAlreadyExistsError } from "./errors/user-already-exists"

describe('RegisterUserUseCase', () => {
  const userRepository = new InMemoryUserRepository()
  const sut = new RegisterUserUseCase(userRepository)

  it('should create a user', async () => {
    const response = await sut.execute({
      username: some.text(),
      password: some.text(),
    })

    expect(response).instanceOf(User)
    expect(
      (
        await userRepository.get({ id: response.id })  
      ).isEqual(response),
    ).toBeTruthy()
  })

  it('should throw an error if the user already exists', async () => {
    const username = some.text()
    await userRepository.create({
      username,
      password: some.text(),
    })

    await expect(async () => {
      await sut.execute({ username, password: some.text() })
    }).rejects.toThrowError(UserAlreadyExistsError)
  })
})