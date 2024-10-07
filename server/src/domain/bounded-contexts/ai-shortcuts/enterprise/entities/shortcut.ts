import { Entity } from '@/domain/core/entities/base'
import { ID } from '@/domain/core/entities/id'

export interface ShortcutProps {
  text: string
  isPinned: boolean
  folderId: ID
}

export class Shortcut extends Entity<ShortcutProps> {
  static create(props: ShortcutProps) {
    return new Shortcut(props)
  }

  static reference(id: ID, props: ShortcutProps) {
    return new Shortcut(props, id)
  }
}
