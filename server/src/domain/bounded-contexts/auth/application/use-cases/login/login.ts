import { UseCase } from "@/domain/core/use-cases/base"
import { UserRepository } from "../../repositories/user"


interface Payload {
  username: string
  password: string
}


export class LoginUseCase implements UseCase {

  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async execute(payload: Payload) {

    return {
      accessToken: 'some-access-token',
    }
  }
}