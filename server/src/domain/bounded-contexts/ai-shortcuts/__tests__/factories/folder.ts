import { Factory } from '@tests/types/factory'
import { createID } from '@tests/utils/domain'
import { some } from '@tests/utils/some'

import { FolderRepository } from '../../application/repositories/folder'
import { Folder, FolderProps } from '../../enterprise/entities/folder'

export function createFolderData({
  name = some.text(),
  description = some.text(),
  isPrivate = some.boolean(),
  ownerId = createID(),
}: Partial<FolderProps> = {}): FolderProps {
  return {
    name,
    description,
    isPrivate,
    ownerId,
  }
}

export class FolderFactory implements Factory<Folder> {
  constructor(private folderRepository: FolderRepository) {}

  async create(data: Partial<FolderProps> = {}) {
    return this.folderRepository.create(createFolderData(data))
  }
}
