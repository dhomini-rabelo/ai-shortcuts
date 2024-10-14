import { ResourceNotFoundError } from '@/domain/core/adapters/repository/errors/resource-not-found'

import { FolderFactory } from '../../../__tests__/factories/folder'
import { InMemoryFolderRepository } from '../../../__tests__/repositories/folder'
import { Folder } from '../../../enterprise/entities/folder'
import { ToggleFolderVisibility } from './toggle-folder-visibility'

describe('ToggleFolderVisibility', () => {
  const folderRepository = new InMemoryFolderRepository()
  const folderFactory = new FolderFactory(folderRepository)
  const sut = new ToggleFolderVisibility(folderRepository)

  beforeEach(async () => {
    await folderRepository.reset()
  })

  it("should throw ResourceNotFoundError if the folderId doesn't exists", async () => {
    await expect(async () => {
      await sut.execute({
        folderId: 'invalid-id',
        isPrivate: true,
      })
    }).rejects.toThrowError(ResourceNotFoundError)
  })

  it('should toggle folder visibility to true', async () => {
    const folder = await folderFactory.create({
      isPrivate: false,
    })

    const response = await sut.execute({
      folderId: folder.id.toString(),
      isPrivate: true,
    })

    expect(response).instanceOf(Folder)
    expect(response.props.isPrivate).toBeTruthy()
  })

  it('should toggle folder visibility to false', async () => {
    const folder = await folderFactory.create({
      isPrivate: true,
    })

    const response = await sut.execute({
      folderId: folder.id.toString(),
      isPrivate: false,
    })

    expect(response).instanceOf(Folder)
    expect(response.props.isPrivate).toBeFalsy()
  })
})
