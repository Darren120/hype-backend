import * as firebaseAdmin from 'firebase-admin';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class FirebaseService implements OnModuleInit, OnModuleDestroy {
  admin = firebaseAdmin;
  auth: firebaseAdmin.auth.Auth;
  firestore : firebaseAdmin.firestore.Firestore
  onModuleDestroy() {
    return;
  }
  async onModuleInit() {
    if (process.env.MODE == "DEV") {
      console.log("a: " + process.env.MODE)
      process.env.FIRESTORE_EMULATOR_HOST="localhost:8080"
      process.env.FIREBASE_AUTH_EMULATOR_HOST="localhost:9099"
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const serviceAccount = require('../../firebase_service_acct.json');
      this.admin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount),
      });
    } else {
      this.admin.initializeApp();
    }
    this.auth = this.admin.auth();
    this.firestore = this.admin.firestore()
  }
}
