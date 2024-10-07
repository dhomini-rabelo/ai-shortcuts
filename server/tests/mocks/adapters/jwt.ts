import { JWTModule } from '@/adapters/jwt'
import { some } from '@tests/utils/some'

export class JWTMock extends JWTModule {
  generateToken(id: string): string {
    return `${some.text(36)}.${some.text(74)}.${id}`
  }
}
