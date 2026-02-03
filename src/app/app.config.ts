import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-26149","appId":"1:682981797823:web:c7cd25ac6da8a176e2fb0a","storageBucket":"ring-of-fire-26149.firebasestorage.app","apiKey":"AIzaSyB435xbgnTkCjaT5AZBYzveVEC5vTwWMu4","authDomain":"ring-of-fire-26149.firebaseapp.com","messagingSenderId":"682981797823"})), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())]
};
