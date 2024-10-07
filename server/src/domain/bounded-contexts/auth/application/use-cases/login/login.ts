import { UseCase } from "@/domain/core/use-cases/base"
import { UserRepository } from "../../repositories/user"
import { InvalidCredentialsError } from "./errors/invalid-credentials"
import { HashModule } from "@/adapters/hash"


interface Payload {
  username: string
  password: string
}


export class LoginUseCase implements UseCase {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashModule: HashModule,
  ) {}

  async execute(payload: Payload) {
    const user = await this.userRepository.findUnique({ username: payload.username })

    if (
      user && this.passwordIsCorrect(payload.password, user.props.password)
    ) {
      return {
        accessToken: 'some-access-token',
      }
    }
    
    throw new InvalidCredentialsError()
  }

  private passwordIsCorrect(payloadPassword: string, userHashPassword: string) {
    return this.hashModule.compare(payloadPassword, userHashPassword)
  }
}