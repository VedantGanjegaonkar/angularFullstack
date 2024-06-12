import { Request, Response } from 'express';
import { UserModel, IUser } from '../models/user.model';
import { log } from 'console';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    let { name, email, dateOfBirth, state, city, vegOrNonVeg, hobbies } = req.body;

    console.log("this is array from frontend:",hobbies)

    // Filter out any null or undefined values from the hobbies array
    hobbies = hobbies.filter((hobby:any) => hobby !== null);
    // console.log("this is array after filter:",filteredHobbies)

    const user: IUser = new UserModel({
      name,
      email,
      dateOfBirth,
      state,
      city,
      vegOrNonVeg,
        hobbies
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error });
  }
};
