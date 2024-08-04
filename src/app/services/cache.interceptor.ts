import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from './cache.service';

export function cacheInterceptorFn(
  cacheService: CacheService
): HttpInterceptorFn {
  return (
    req: HttpRequest<any>,
    next: HttpHandlerFn
  ): Observable<HttpEvent<any>> => {
    const cachedResponse = cacheService.get(req);
    if (cachedResponse) {
      return of(cachedResponse);
    }

    return next(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          cacheService.put(req, event);
        }
      })
    );
  };
}
