import { Injectable } from '@nestjs/common';
import { FileDto } from '../file/file.dto';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Avatar } from './avatar.entity';
import { Repository } from 'typeorm';
import { ImageProcessService } from '../image-process/image-process.service';

@Injectable()
export class AvatarService {
  constructor(
    @InjectRepository(Avatar)
    private readonly avatarRepository: Repository<Avatar>,
    private readonly imageProcess: ImageProcessService,
  ) {}

  async store(data: FileDto, user: User) {
    this.imageProcess.resizeAvatar('uploads/avatar', data.filename);
    return await this.avatarRepository.save({ ...data, user });
  }

  async show(id: number) {
    return await this.avatarRepository.findOne(id);
  }
}
