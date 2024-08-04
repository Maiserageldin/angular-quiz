// cache.service.ts
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache = new Map<string, HttpResponse<any>>();

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    return this.cache.get(this.getKey(req));
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    this.cache.set(this.getKey(req), response);
  }

  private getKey(req: HttpRequest<any>): string {
    return req.urlWithParams;
  }
}
