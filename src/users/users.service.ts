import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // This action adds a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  // This action returns all users
  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  // This action returns one user
  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  // This action updates a user
  async update(id: string, updateUserDto: UpdateUserDto) {
    // eslint-disable-next-line prettier/prettier
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true})
  }

  // This action add a new field to all users
  async addField(type: string) {
    return await this.userModel.updateMany(
      {},
      {
        $set: { [type]: [type] },
      },
    );
  }

  // This action removes a user
  async remove(id: string) {
    return await this.userModel.findByIdAndRemove(id);
  }
}
