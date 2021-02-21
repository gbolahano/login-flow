import {IResolvers} from "graphql-tools";
import User from "../models/user";
import Item from "../models/item"
export const Query: IResolvers = {
  hello: () => "Hello world",
  me: async (_, args, { req }, info) => {
    if (!req.user) {
      throw new Error("Please Login");
    }
    const user = User.findOne({
      where: {
        id: req.user.id,
      },
    });
    return user;
  },
  getItems: async (_, args, { req }, info) => {
    if (!req.user) {
      throw new Error("Please Login");
    }
    const items = await Item.findAll({
      where: {
        userId: req.user.id,
      },
    });
    return items;
  },
};

