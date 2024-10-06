import { Entity } from "@/domain/core/entities/base"
import { ID } from "@/domain/core/entities/id"

export interface FolderProps {
  name: string
  description: string
  isPrivate: boolean
  ownerId: ID
}

export class Folder extends Entity<FolderProps> {
  static create(props: FolderProps) {
    return new Folder(props)
  }

  static reference(id: ID, props: FolderProps) {
    return new Folder(props, id)
  }
}
