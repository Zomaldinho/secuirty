import jwt from 'jsonwebtoken'
import { ITokenHelper } from '../interfaces/ITokenHelper';
import redis from 'ioredis'

export class TokenHelper implements ITokenHelper {
  redisClient = new redis({
    port: +process.env.redisPort!,
    host: process.env.redisHost!,
    username: process.env.redisUsername!,
    password: process.env.redisPassword!,
    db: +process.env.redisDb!
  })

  signToken = async (userId: number, type: string) => {
    try {
      const isAccessToken = type == 'access'
      const secret = isAccessToken
        ? process.env.ACCESS_TOKEN_SECRET
        : process.env.REFRESH_TOKEN_SECRET;
      const token = jwt.sign({}, secret!, {
        expiresIn: isAccessToken? '10m': '1y',
        issuer: String(userId)
      })
      if(!isAccessToken){
        await this.redisClient.set(
          String(userId),
          token,
          'ex',
          365 * 24 * 60 * 60
        );
      }
      return token
    } catch (error) {
      throw error
    }
  }
}