import {IResolvers} from "graphql-tools";
import User from "../models/user"

export const ItemResolver: IResolvers = {
  user: async (_, args, ctx, info) => {
    const user = await User.findOne({
      where: {
        id: _.userId,
      },
    });
    return user;
  },
};
