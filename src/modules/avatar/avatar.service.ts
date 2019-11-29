import { Injectable } from '@nestjs/common';
import { FileDto } from '../file/file.dto';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Avatar } from './avatar.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AvatarService {
  constructor(
    @InjectRepository(Avatar)
    private readonly avatarRepository: Repository<Avatar>,
  ) {}

  async store(data: FileDto, user: User) {
    return await this.avatarRepository.save({ ...data, user });
  }
}
