export interface ITokenHelper{
  signToken(userId: number, type: string): Promise<string>
}