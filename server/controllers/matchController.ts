import { NextFunction, Request, Response } from "express";
import userService from "../services/userService";
import { standardResponse } from "../utils/constants";
import { And, In, Not } from "typeorm";
import ErrorApi from "../utils/errorApi";
import { getIO, getOnlineUsers } from "../socket/socket.server";

export default class MatchController {
  static async swipeRight(req:Request, res:Response, next:NextFunction){
    try {
      const { userId } = req.params;
      const user = await userService.findUser({
        where: {
          id: userId
        },
        relations: {
          dislikes: true,
          likes: true,
          matches: true
        }
      });
      if(!user) {
        throw ErrorApi.NotFound('User not found');
      };
      const currentUser = await userService.findUser({
        where: {
          id: req.user.id
        },
        relations: {
          dislikes: true,
          likes: true,
          matches: true
        }
      });
      if(!currentUser) {
        throw ErrorApi.NotFound('Current user not found');
      };
      currentUser.likes.push(user);
      if(user.likes.find((item) => item.id == currentUser.id)) {
        // if likes matched 
        currentUser.matches.push(user);
        user.matches.push(currentUser);
        // send notification with socket.io to both online users
        const onlineUsers = getOnlineUsers();
        const io = getIO();
        const likedUserSocketId = onlineUsers.get(user.id);
        if(likedUserSocketId) {
          io.to(likedUserSocketId).emit('newMatch', {
            id: currentUser.id,
            name: currentUser.name,
            image: currentUser.image
          })
        }
        const currentUserSocketId = onlineUsers.get(currentUser.id);
        if(currentUserSocketId) {
          io.to(currentUserSocketId).emit('newMatch', {
            id: user.id,
            name: user.name,
            image: user.image
          })
        }
      }
      await userService.saveUser(user);
      const result = await userService.saveUser(currentUser);
      return res.status(200).json(standardResponse(true, 'User swiped to right', result));
    } catch (error) {
      next(error);
    }
  }
  static async swipeLeft(req:Request, res:Response, next:NextFunction){
    try {
      const { userId } = req.params;
      const user = await userService.findUser({
        where: {
          id: userId
        },
        relations: {
          dislikes: true,
          likes: true,
          matches: true
        }
      });
      if(!user) {
        throw ErrorApi.NotFound('User not found');
      };
      const currentUser = await userService.findUser({
        where: {
          id: req.user.id
        },
        relations: {
          dislikes: true,
          likes: true,
          matches: true
        }
      });
      if(!currentUser) {
        throw ErrorApi.NotFound('Current user not found');
      };
      currentUser.dislikes.push(user);
      const result = await userService.saveUser(user);
      return res.status(200).json(standardResponse(true, 'User swiped  to left', result));
    } catch (error) {
      next(error);
    }
  }
  static async getMatches(req:Request, res:Response, next:NextFunction){
    try {
      const currentUserId = req.user.id;
      const user = await userService.findUser({
        where:{
          id: currentUserId,
        },
        relations: {
          matches: true
        }
      })
      return res.status(200).json(standardResponse(true, 'Matches received', user?.matches))
    } catch (error) {
      next(error);
    }
  }
  static async userProfiles(req:Request, res:Response, next:NextFunction){
    try {
      const currentUser = await userService.findUser({
        where: {
          id: req.user.id
        },
        relations: {
          likes: true,
          dislikes: true,
          matches: true
        }
      });
      if(!currentUser){
        throw ErrorApi.NotFound('User not found')
      }
      // Profiles to display
      // const profiles = await userService.findManyUsers({
      //   where:{
      //     // Eliminate who already liked, disliked, exists in matches
      //     // id:And(
      //     //   Not(In(currentUser.likes)),
      //     //   Not(In(currentUser.dislikes)),
      //     //   Not(In(currentUser.matches))
      //     // ),
      //     gender: currentUser.genderPreference,
      //     genderPreference: currentUser.gender
      //   }
      // });
      const likedUsers = currentUser.likes.map((user) => user.id);
      const dislikedUsers = currentUser.dislikes.map((user) => user.id);
      const matchedUsers = currentUser.matches.map((user) => user.id);
      const profiles = await userService.findBy({
        id:And(
            Not(In(likedUsers)),
            Not(In(dislikedUsers)),
            Not(In(matchedUsers))
          ),
          gender: currentUser.genderPreference,
          genderPreference: currentUser.gender
      });
      return res.status(200).json(standardResponse(true, 'Profiles received', profiles));
    } catch (error) {
      next(error);
    }
  }
};