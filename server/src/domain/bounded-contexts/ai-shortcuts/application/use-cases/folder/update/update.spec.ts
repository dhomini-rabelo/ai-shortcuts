import { ResourceNotFoundError } from '@/domain/core/adapters/repository/errors/resource-not-found'

import {
  createFolderData,
  FolderFactory,
} from '../../../../__tests__/factories/folder'
import { InMemoryFolderRepository } from '../../../../__tests__/repositories/folder'
import { Folder } from '../../../../enterprise/entities/folder'
import { NonAuthorizedOwnerId } from './errors/non-authorized-owner-id'
import { UpdateFolderUseCase } from './update'

describe('UpdateFolderUseCase', () => {
  const folderRepository = new InMemoryFolderRepository()
  const folderFactory = new FolderFactory(folderRepository)
  const sut = new UpdateFolderUseCase(folderRepository)

  beforeEach(async () => {
    await folderRepository.reset()
  })

  it("should throw ResourceNotFoundError if the folderId doesn't exists", async () => {
    await expect(async () => {
      await sut.execute({
        folderId: 'invalid-id',
        ownerId: 'invalid-id',
        newData: createFolderData(),
      })
    }).rejects.toThrowError(ResourceNotFoundError)
  })

  it('should throw NonAuthorizedOwnerId update if ownerId is from another user', async () => {
    const folder = await folderFactory.create()
    const newFolderData = createFolderData()

    await expect(async () => {
      await sut.execute({
        folderId: folder.id.toString(),
        ownerId: 'another-user-id',
        newData: newFolderData,
      })
    }).rejects.toThrowError(NonAuthorizedOwnerId)
  })

  it.only('should update a folder', async () => {
    const folder = await folderFactory.create()
    const newFolderData = {
      ...createFolderData(),
      ownerId: undefined,
    }

    const response = await sut.execute({
      folderId: folder.id.toString(),
      ownerId: folder.props.ownerId.toString(),
      newData: newFolderData,
    })

    expect(response).instanceOf(Folder)
    expect(response.props).toEqual({
      ...newFolderData,
      ownerId: folder.props.ownerId,
    })
  })
})
