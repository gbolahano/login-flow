import {
  Model,
  DataTypes,
  Optional,
} from "sequelize";

import User from "./user";
import sequelize from "./db";
// These are all the attributes in the Item model
interface ItemAttributes {
  id: number;
  title: string;
  userId: number;
}

// Some attributes are optional in `User.build` and `User.create` calls
interface ItemCreationAttributes extends Optional<ItemAttributes, "id"> {}

class Item extends Model<ItemAttributes, ItemCreationAttributes> implements ItemAttributes {
  public id!: number;
  public title!: string;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


Item.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
    },
    title: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.INTEGER
    },
  },
  {
    sequelize,
    tableName: "items",
  }
);

export default Item;