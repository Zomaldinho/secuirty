import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";
import { User } from "./User";

export class Action extends Model<IAction, IAction>{
  public id!: number;
  public name!: string;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Action.init(
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
  },
  {
    sequelize,
    tableName: 'Actions'
  }
)

// Action.hasMany(User)
// User.belongsToMany(Action, { through: 'User_Action' })

export interface IAction{
  id?: number;
  name: string;
}