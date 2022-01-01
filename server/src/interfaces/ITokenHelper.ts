export interface ITokenHelper{
  signToken(userId: number, type: string): Promise<string>
  verifyToken(token: string, type: string): Promise<string>
}