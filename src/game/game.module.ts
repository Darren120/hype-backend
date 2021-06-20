import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { SetUpModule } from 'src/setup/setup.module';

@Module({
  imports: [SetUpModule],
  controllers: [GameController],
  providers: [GameService]
})
export class GameModule {}
