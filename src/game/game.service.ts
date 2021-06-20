import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/setup/firebase.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameInfo } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(private readonly firebase: FirebaseService){}


  async create(authToken: string, createGameDto: CreateGameDto): Promise<GameInfo> {
    const token = authToken.split('Bearer ')[1];
    const authResult = await this.firebase.auth.verifyIdToken(token);
    const date = new Date;
    const newGameEntity : GameInfo = {
      banner_img_self_link : createGameDto.banner_img_self_link,
      developer : createGameDto.developer,
      game_id: createGameDto.game_id,
      game_title : createGameDto.game_title,
      hype: 0,
      img_self_link: createGameDto.img_self_link,
      is_digital : createGameDto.is_digital,
      is_physical : createGameDto.is_physical,
      msrp : createGameDto.msrp,
      platforms : createGameDto.platforms,
      publisher : createGameDto.publisher,
      release_date : createGameDto.release_date,
      visibility : createGameDto.visibility,
      switch_img_self_link : createGameDto.switch_img_self_link,
      createdAt: date,
      updatedAt: date,
      isDeleted: false,
      selfDocID : "",
      createdBy: authResult.uid,
    }
    const newGameInfoDoc = this.firebase.firestore.collection("GameInfo").doc()
    newGameEntity.selfDocID = newGameInfoDoc.id
    await newGameInfoDoc.set(newGameEntity)
    return newGameEntity;
  }

  // async findAll(): Promise<GameInfo> {
  //   return `This action returns all game`;
  // }

  // async findOne(id: number): Promise<GameInfo> {
  //   return `This action returns a #${id} game`;
  // }

  // async update(authToken: string, updateGameDto: UpdateGameDto): Promise<GameInfo> {
  //   const token = authToken.split('Bearer ')[1];
  //   const authResult = await this.firebase.auth.verifyIdToken(token);
  //   return 'This action adds a new game';
  // }

  // async delete(authToken: string, docID: string): Promise<GameInfo> {
  //   const token = authToken.split('Bearer ')[1];
  //   const authResult = await this.firebase.auth.verifyIdToken(token);
  //   authResult.firebase.identities.
  //   return 'This action adds a new game';
  // }
}
