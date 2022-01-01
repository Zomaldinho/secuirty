import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  Model,
} from 'sequelize';
import { sequelize } from '../database/connection';
import { Action } from './Action';

export class User extends Model<IUser, IUser> {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  declare getActions: HasManyGetAssociationsMixin<Action>;
  declare addAction: HasManyAddAssociationMixin<Action, number>;
  declare hasAction: HasManyHasAssociationMixin<Action, number>;
  declare countActions: HasManyCountAssociationsMixin;
  declare createAction: HasManyCreateAssociationMixin<Action>;

  declare readonly projects?: Action[];
  declare static associations: {
    actions: Association<User, Action>;
  };
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
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: 'Users',
  }
);

Action.belongsToMany(User, { through: 'User_Action' });
User.belongsToMany(Action, { through: 'User_Action' });

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
}
