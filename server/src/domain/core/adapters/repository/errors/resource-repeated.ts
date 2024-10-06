import { DatabaseError } from './_base'

export class ResourceRepeated extends DatabaseError {
  public readonly type = 'resource-repeated'
}
