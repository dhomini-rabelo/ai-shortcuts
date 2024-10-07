import { EntityWithStatic } from '@/domain/core/entities/base'
import { InMemoryRepository } from '@tests/utils/in-memory-repository'

import { FolderRepository } from '../../application/repositories/folder'
import { Folder } from '../../enterprise/entities/folder'

export class InMemoryFolderRepository
  extends InMemoryRepository<Folder>
  implements FolderRepository
{
  protected entity = Folder as unknown as EntityWithStatic<Folder>
}
