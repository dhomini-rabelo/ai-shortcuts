import { WithID } from '@/domain/core/entities/types'

import { Entity } from '../../entities/base'

export interface Repository<EntityClass extends Entity> {
  create(props: EntityClass['props']): Promise<EntityClass>

  get(props: Partial<WithID<EntityClass['props']>>): Promise<EntityClass>

  findUnique(
    props: Partial<WithID<EntityClass['props']>>,
  ): Promise<EntityClass | null>

  findFirst(
    props: Partial<WithID<EntityClass['props']>>,
  ): Promise<EntityClass | null>

  findMany(
    params: Partial<WithID<EntityClass['props']>>,
  ): Promise<EntityClass[]>

  reset(): Promise<void>
}
