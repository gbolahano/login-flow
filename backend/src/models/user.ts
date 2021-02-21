import {
  Sequelize,
  BuildOptions,
  Model,
  DataTypes,
  Optional,
} from "sequelize";

import Item from "./item";

import sequelize from "./db";
// These are all the attributes in the User model
interface UserAttributes {
  id: Number;
  name: string;
  email: string;
  password: string;
  resetToken: string | null;
  resetTokenExpiry: Date | number | null;
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public resetToken!: string | null;
  public resetTokenExpiry!: Date | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}


User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
    },
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.INTEGER
    },
    password: {
      type: DataTypes.STRING
    },
    resetToken: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    resetTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "users",
  }
);

export default User;
