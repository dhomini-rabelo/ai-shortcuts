import { ID } from '@/domain/core/entities/id'
import { UseCase } from '@/domain/core/use-cases/base'

import { FolderProps } from '../../../../enterprise/entities/folder'
import { FolderRepository } from '../../../repositories/folder'
import { NonAuthorizedOwnerId } from './errors/non-authorized-owner-id'

type Payload = {
  folderId: string
  ownerId: string
  newData: Omit<FolderProps, 'ownerId'>
}

export class UpdateFolderUseCase implements UseCase {
  constructor(private readonly folderRepository: FolderRepository) {}

  async execute(payload: Payload) {
    const folder = await this.folderRepository.get({
      id: new ID(payload.folderId),
    })

    if (folder.props.ownerId.toValue() !== payload.ownerId) {
      throw new NonAuthorizedOwnerId()
    }

    return this.folderRepository.update(folder.id, {
      ...payload.newData,
    })
  }
}
