import { ID } from '@/domain/core/entities/id'
import { UseCase } from '@/domain/core/use-cases/base'

import { FolderRepository } from '../../repositories/folder'

type Payload = {
  folderId: string
  isPrivate: boolean
}

export class ToggleFolderVisibility implements UseCase {
  constructor(private readonly folderRepository: FolderRepository) {}

  async execute(payload: Payload) {
    return this.folderRepository.update(new ID(payload.folderId), {
      isPrivate: payload.isPrivate,
    })
  }
}
