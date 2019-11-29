import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  ParseIntPipe,
  Res,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDto } from '../file/file.dto';
import { User } from '../../core/decorators/user.decorator';
import { User as UserEntity } from '../user/user.entity';
import { AvatarService } from './avatar.service';
import { Response } from 'express';

@Controller('avatar')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @Post()
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('avatar'))
  async store(@UploadedFile() data: FileDto, @User() user: UserEntity) {
    return await this.avatarService.store(data, user);
  }

  @Get(':id')
  async serve(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
    @Query('size') size: string,
  ) {
    const file = await this.avatarService.show(id);
    let { filename } = file;

    if (size) {
      filename = `${filename}-${size}`;
    }

    res.sendFile(filename, {
      root: 'uploads/avatar',
      headers: {
        'Content-type': file.mimetype,
      },
    });
  }
}
