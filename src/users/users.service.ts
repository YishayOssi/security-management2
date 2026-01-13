import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { listOfUsers } from '../../DB'; 


@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    const newUser = {
      id: Date.now(),
      ...createUserDto,
    };

    listOfUsers.push(newUser);
    return newUser;
  }


  findAll() {
    return listOfUsers
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
