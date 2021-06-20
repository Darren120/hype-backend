import { Controller, Get, Req, Res } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Req() req: FastifyRequest, @Res() res: FastifyReply): Promise<any> {
    console.log(process.env + " " + process.env.NODE_ENV)
    try {
      return res.send(await this.appService.getHello());
    } catch (error) {
      
      if ((process.env.MODE == "DEV")) {
        return res.send({msg: "Please make sure you started up emulator!##!!", SOURCE: process.env.SOURCE, error : error, mode : process.env.MODE})
      }
      return res.send({msg: "An error has occured. This is bad!##!!", SOURCE: process.env.SOURCE, error : error, MODE: process.env.MODE})
    }
  }
}
