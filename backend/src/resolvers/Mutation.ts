import {IResolvers} from "graphql-tools";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";

import { generateToken, generateResetToken } from "../libs/utils";
import { transport, makeANiceEmail } from "../libs/mail";
import User from "../models/user";
import Item from "../models/item"

export const Mutation: IResolvers = {
  signup: async (_, { data }, ctx, info) => {
    let userExists = await User.findOne({
      where: {
        email: data.email,
      },
    });

    if (userExists) {
      throw new Error("This email has been registered");
    }

    let salt = bcrypt.genSaltSync(10);
    let hashedPassword = bcrypt.hashSync(data.password, salt);

    const user = await User.create({
      ...data,
      password: hashedPassword,
    });
    return user;
  },
  signin: async (_, { email, password }, { res }, info) => {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw Error("Invalid Email Address");
    }
    let hashedPassword = bcrypt.compareSync(password, user.password);
    let userData = {
      id: user.id,
      name: user.name,
      email,
    };
    if (user.email == email && hashedPassword) {
      const token = generateToken(userData);
      res.cookie("accessToken", token, { maxAge: 60 * 60 * 24 * 7 });
      return {
        user,
        auth: true,
      };
    } else {
      throw new Error("Invalid Login Parameters");
    }
  },
  signout: async (_, args, { res }, info) => {
    res.clearCookie("accessToken");
    return { message: "Signed Out" };
  },
  requestReset: async (_, args, ctx, info) => {
    let userExists = await User.findOne({
      where: {
        email: args.email,
      },
    });

    if (!userExists) {
      throw new Error("This email is Invalid!");
    }

    const resetToken = await generateResetToken();
    const resetTokenExpiry = Date.now() + 3600000;
    // update user with resetToken and resetTokenExpiry
    // email the reset token
    const res = await User.update(
      { resetToken, resetTokenExpiry },
      {
        where: {
          id: userExists.id,
        },
      }
    );
    // const mail = await transport.sendMail({
    //   =: 'gos@gbolahan.com',
    //   to: userEmail,
    //   subject: 'You Password Reset Token',
    //   html: makeANiceEmail(`Your Password Reset Token is here \n\n
    //   <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}"> Click Here to Reset</a>`),
    // });

    return { message: "Please Check You Mail, Thanks!" };
  },
  resetPassword: async (_, args, ctx, info) => {
    if (args.password !== args.verifyPassword) {
      throw new Error("Your paswords don't match");
    }
    // check if the token is valid and not expired
    const user = await User.findOne({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry: {
          [Op.gt]: Date.now() - 3600000,
        },
      },
    });
    if (!user) {
      throw new Error("This token is either invalid or expired!");
    }
    // hash the password
    let salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(args.password, salt);
    // save the password and remove old resetToken and resetTokenExpiry
    const updatedUser = await User.update(
      {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
      {
        where: {
          email: user.email,
        },
      }
    );
    return user;
  },
  createItem: async (_, { data }, { req }, info) => {
    if (!req.user) {
      throw new Error("Please Login");
    }
    const newItem = await Item.create({
      ...data,
      userId: req.user.id,
    });
    return newItem;
  },
};

