export abstract class JWTModule {
  abstract generateToken(value: string): string
  abstract getValueFromToken(token: string): string
}
