// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { User, UserDocument } from './schemas/user.schema';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

// @Injectable()
// export class UsersService {
//   constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

//   // 🔹 Create a new user and save to the database
//   async create(createUserDto: CreateUserDto): Promise<UserDocument> {
//     const newUser = new this.userModel(createUserDto);
//     return newUser.save();
//   }

//   // 🔹 Find a user by email
//   async findOneByEmail(email: string): Promise<UserDocument | null> {
//     return this.userModel.findOne({ email }).exec();
//   }

//   // 🔹 Find all users
//   async findAll(): Promise<UserDocument[]> {
//     return this.userModel.find().exec();
//   }

//   // 🔹 Find a user by ID
//   async findOne(id: string): Promise<UserDocument> {
//     const user = await this.userModel.findById(id).exec();
//     if (!user) {
//       throw new NotFoundException(`User with ID ${id} not found`);
//     }
//     return user;
//   }

//   // 🔹 Update a user
//   async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
//     const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
//       new: true, // return updated document
//     }).exec();

//     if (!updatedUser) {
//       throw new NotFoundException(`User with ID ${id} not found`);
//     }
//     return updatedUser;
//   }

//   // 🔹 Remove a user
//   async remove(id: string): Promise<void> {
//     const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
//     if (!deletedUser) {
//       throw new NotFoundException(`User with ID ${id} not found`);
//     }
//   }
// }


// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { User, UserDocument } from './schemas/user.schema';

// @Injectable()
// export class UsersService {
//   constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

//   async findOneByEmail(email: string): Promise<UserDocument | null> {
//     return this.userModel.findOne({ email }).exec();
//   }

//   async create(userData: Partial<User>): Promise<UserDocument> {
//     const newUser = new this.userModel(userData);
//     return newUser.save();
//   }
// }
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(page: number, limit: number): Promise<UserDocument[]> {
    return this.userModel.find().skip((page - 1) * limit).limit(limit).exec();
  }

  async findOne(id: string): Promise<UserDocument | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // async findOneByEmail(email: string): Promise<UserDocument | null> {
  //   return this.userModel.findOne({ email }).exec();
  // }
  async findOneByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }
  
  async update(id: string, updateUserDto: Partial<User>): Promise<UserDocument> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }
async create(createUserDto: CreateUserDto ){
  const user = await this.userModel.create(createUserDto);
  return user;
}
  async remove(id: string): Promise<{ message: string }> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return { message: 'User deleted successfully' };
  }
}

