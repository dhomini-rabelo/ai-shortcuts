import { Entity } from '@/domain/core/entities/base'
import { EmptyRecord } from '@typing/simple'

import { DatabaseError } from './_base'

export class ResourceNotFoundError extends DatabaseError {
  public readonly type = 'resource-not-found'

  constructor(public readonly entity: Entity<EmptyRecord>) {
    super()
  }
}
