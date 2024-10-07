import { UseCase } from '@/domain/core/use-cases/base'

import { UserRepository } from '../../repositories/user'
import { UserAlreadyExistsError } from './errors/user-already-exists'

interface Payload {
  username: string
  password: string
}

export class RegisterUserUseCase implements UseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(payload: Payload) {
    const userWithTheSameUsername = await this.userRepository.findUnique({
      username: payload.username,
    })

    if (userWithTheSameUsername) {
      throw new UserAlreadyExistsError()
    }

    return this.userRepository.create(payload)
  }
}
