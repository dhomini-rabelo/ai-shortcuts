import { ID } from '@/domain/core/entities/id'
import { UseCase } from '@/domain/core/use-cases/base'

import { FolderProps } from '../../../enterprise/entities/folder'
import { FolderRepository } from '../../repositories/folder'

type OverWrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U

type Payload = OverWrite<
  FolderProps,
  {
    ownerId: string
  }
>

export class CreateFolderUseCase implements UseCase {
  constructor(private readonly folderRepository: FolderRepository) {}

  async execute(payload: Payload) {
    return this.folderRepository.create({
      ...payload,
      ownerId: new ID(payload.ownerId),
    })
  }
}
