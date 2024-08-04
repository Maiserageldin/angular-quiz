import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { CacheService } from './app/services/cache.service';
import { cacheInterceptorFn } from './app/services/cache.interceptor';
import { routes } from './app/app.routes';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([cacheInterceptorFn(new CacheService())])
    ),
    provideRouter(routes),
  ],
}).catch((err) => console.error(err));
