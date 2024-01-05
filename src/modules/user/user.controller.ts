import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(@Body() body: CreateUserDTO, @Res() res: Response) {
    try {
      let {err, data} = await this.userService.create(body);
      if(err) {
        console.log("err", err)
        if(err?.meta?.target == "User_email_key") throw ["Email đã tồn tại nhe bạn ơi ah aha ahah ok rồi!"]
        throw ["Lỗi gì đó!"]
      }
      return res.status(201).json({
        message: "Đăng ký thành công!",
        data
      })
    }catch(err) {
      return res.status(500).json({
        message: err
      })
    }
  }
}
