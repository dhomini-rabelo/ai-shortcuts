import { createFolderData } from '../../../__tests__/factories/folder'
import { InMemoryFolderRepository } from '../../../__tests__/repositories/folder'
import { Folder } from '../../../enterprise/entities/folder'
import { CreateFolderUseCase } from './create'

describe('CreateFolderUseCase', () => {
  const folderRepository = new InMemoryFolderRepository()
  const sut = new CreateFolderUseCase(folderRepository)

  beforeEach(async () => {
    await folderRepository.reset()
  })

  it('should create a folder', async () => {
    const folderData = createFolderData()
    const response = await sut.execute({
      ...folderData,
      ownerId: folderData.ownerId.toValue(),
    })

    expect(response).instanceOf(Folder)
    expect(
      (await folderRepository.get({ id: response.id })).isEqual(response),
    ).toBeTruthy()
  })
})
