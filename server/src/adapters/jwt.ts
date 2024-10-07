export abstract class JWTModule {
  abstract generateToken(value: string): string
}
