import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";

export class User extends Model<IUser, IUser>{
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    tableName: 'Users'
  }
)

export interface IUser{
  id?: number;
  name: string;
  email: string;
  password: string;
}