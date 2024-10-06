import { Entity } from "@/domain/core/entities/base"
import { ID } from "@/domain/core/entities/id"

export interface OwnerProps {
  username: string
  password: string
}

export class Owner extends Entity<OwnerProps> {
  static create(props: OwnerProps) {
    return new Owner(props)
  }

  static reference(id: ID, props: OwnerProps) {
    return new Owner(props, id)
  }
}
