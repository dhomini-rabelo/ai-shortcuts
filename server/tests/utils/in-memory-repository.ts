import { Repository } from '@/domain/core/adapters/repository'
import { ResourceNotFoundError } from '@/domain/core/adapters/repository/errors/resource-not-found'
import { RepeatedResource } from '@/domain/core/adapters/repository/errors/repeated-resource'
import { EntityWithStatic, Entity } from '@/domain/core/entities/base'
import { ID } from '@/domain/core/entities/id'
import { WithID } from '@/domain/core/entities/types'

export abstract class InMemoryRepository<EntityClass extends Entity>
  implements Repository<EntityClass>
{
  protected items: EntityClass[] = []
  protected entity: EntityWithStatic<EntityClass>

  async create(props: EntityClass['props']) {
    const newPet = await this.entity.create(props)
    this.items.push(newPet)
    return newPet
  }

  async get(
    props: Partial<WithID<EntityClass['props']>>,
  ): Promise<EntityClass> {
    const itemsFound = this.items.filter((item) => this.compare(item, props))
    if (itemsFound.length > 1) {
      throw new RepeatedResource()
    } else if (itemsFound.length === 0) {
      throw new ResourceNotFoundError(this.entity)
    }
    return itemsFound[0]
  }

  async findUnique(
    props: Partial<WithID<EntityClass['props']>>,
  ): Promise<EntityClass | null> {
    const itemsFound = this.items.filter((item) => this.compare(item, props))
    if (itemsFound.length > 1) {
      throw new RepeatedResource()
    }
    return itemsFound.length === 1 ? itemsFound[0] : null
  }

  async findFirst(
    props: Partial<WithID<EntityClass['props']>>,
  ): Promise<EntityClass | null> {
    const itemsFound = this.items.filter((item) => this.compare(item, props))
    return itemsFound.length === 1 ? itemsFound[0] : null
  }

  async findMany(props: Partial<WithID<EntityClass['props']>>) {
    return this.items.filter((item) => this.compare(item, props))
  }

  async reset() {
    this.items = []
  }

  private compare(
    item: EntityClass,
    props: Partial<WithID<EntityClass['props']>>,
  ): boolean {
    return Object.entries(props).every(
      ([fieldName, fieldValue]: [string, any]) => {
        const prop = item.getProp(fieldName)
        return prop instanceof ID && fieldValue instanceof ID
          ? prop.isEqual(fieldValue)
          : prop === fieldValue
      },
    )
  }
}
