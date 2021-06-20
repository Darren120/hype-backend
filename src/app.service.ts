import { Injectable } from '@nestjs/common';

import { FirebaseService } from './setup/firebase.service';

@Injectable()
export class AppService {
  constructor(private readonly firebase: FirebaseService) {}
  async getHello(): Promise<any> {
    if (process.env.MODE == "DEV") {
      const a = await this.firebase.auth.getUserByEmail('zoudarren7@gmail.com');
      const dd =  await this.firebase.admin.firestore().collection("User").doc("Gpib8tNQkrhhqs3JJTP5").get();
      return {env: process.env.SOURCE,mode: process.env.MODE, randomAuthTest: a.email, sampleFirestoreData: dd.data()};
    } else {
      const a = await this.firebase.auth.getUserByEmail('justlock10@gmail.com');
      const comment = await (await (await this.firebase.admin.firestore().collection("game_data").doc("game").get()).data());
      return {env: process.env.SOURCE,mode: process.env.MODE, randomAuthTest: a.email, sampleFirestoreData: comment};
    }
    
  }
}
