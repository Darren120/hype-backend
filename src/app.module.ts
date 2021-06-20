import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SetUpModule } from './setup/setup.module';
import { ConfigModule } from '@nestjs/config';
import { GameModule } from './game/game.module';

@Module({
  imports: 
  [ConfigModule.forRoot(),
    GameModule,
    SetUpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
