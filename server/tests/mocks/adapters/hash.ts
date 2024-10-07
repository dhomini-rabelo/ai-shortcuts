import { HashModule } from '@/adapters/hash'

export class HashMock implements HashModule {
  generate(input: string): string {
    return input.concat('///')
  }

  compare(input: string, hash: string): boolean {
    return this.generate(input) === hash
  }
}
