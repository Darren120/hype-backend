import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { FastifyReply, FastifyRequest  } from 'fastify';
import * as defaultRes from '../setup/apiDefaultResponses';
import { GameInfo } from './entities/game.entity';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @ApiBearerAuth('firebaseIDToken')
  @ApiOperation({
    description:
      'Add a new game. All JSON body must be entered.',
  })
  @Post()
  async create(@Body() createGameDto: CreateGameDto, @Req() req: FastifyRequest, @Res() res: FastifyReply) {

    const authToken = req.headers.authorization;
    
    if (authToken === undefined) {
      res.statusCode = 403;
      return res.send(defaultRes.authorizationError);
    }
    try {
      const response = await this.gameService.create(authToken, createGameDto)
      res.statusCode = 200;
      return res.send(response);
    } catch (error) {
      if (error.code == 'auth/id-token-expired') {
        const err = new Error(
          'Authorization session expired. Please re-log, or refresh your application.',
        );
        res.statusCode = 403;
        return res.send(err);
      }
      res.statusCode = 400;
      return res.send(error)
    }
  }

  // @Get()
  // findAll() {
  //   return this.gameService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.gameService.findOne(+id);
  // }


  // @ApiOperation({
  //   description:
  //     'Update game infomation. All JSON enteries are optional.',
  // })
  // @Patch('/update')
  // async update(@Body() updateGameDto: UpdateGameDto, @Req() req: Request, res: Response) {
  //   const authToken = req.headers.authorization;
  //   if (authToken === undefined) {
  //     return defaultRes.authorizationError;
  //   }
  //   try {
  //     return await this.gameService.update(authToken, updateGameDto);
  //   } catch (error) {
  //     if (error.code == 'auth/id-token-expired') {
  //       const err = new Error(
  //         'Authorization session expired. Please re-log, or refresh your application.',
  //       );
  //       res.statusCode = 403;
  //       res.send(err);
  //       return;
  //     }
  //     return error;
  //   }
  // }

  // @ApiBearerAuth('firebaseIDToken')
  // @ApiOperation({
  //   description:
  //     'Delete a single game. Append the ID at the end of the link.',
  // })
  // @ApiBearerAuth('firebaseIDToken')
  // @Delete('/delete/:docID')
  // async remove(@Param('docID') docID: string, @Req() req: Request, @Res() res: Response) {
  //   const authToken = req.headers.authorization;
  //   if (authToken === undefined) {
  //     return defaultRes.authorizationError;
  //   }
  //   try {
  //     return await this.gameService.delete(authToken, docID);
  //   } catch (error) {
  //     if (error.code == 'auth/id-token-expired') {
  //       const err = new Error(
  //         'Authorization session expired. Please re-log, or refresh your application.',
  //       );
  //       res.statusCode = 403;
  //       res.send(err);
  //       return;
  //     }
  //     return error;
  //   }
  // }
}
