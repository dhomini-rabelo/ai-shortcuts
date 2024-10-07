import { UseCase } from "@/domain/core/use-cases/base"
import { UserRepository } from "../../repositories/user"
import { InvalidCredentialsError } from "./errors/invalid-credentials"


interface Payload {
  username: string
  password: string
}


export class LoginUseCase implements UseCase {

  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async execute(payload: Payload) {
    const user = await this.userRepository.findUnique({ username: payload.username })

    if (!user) {
      throw new InvalidCredentialsError()
    }

    return {
      accessToken: 'some-access-token',
    }
  }
}