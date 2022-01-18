import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private readonly imageLink = environment.imageUrl;

  constructor(private http: HttpClient) {
  }

  public getDownloadLink(id: string): Observable<string> {
    return this.http.get(this.getLinkFormatted(id)).pipe(
      map((data: any) => data.download_url || ''),
      catchError((err: any) => {
        console.log('getDownloadLink Error', err);
        return of('');
      })
    );
  }

  private getLinkFormatted(id: string): string {
    return `${this.imageLink}/id/${id}/info`;
  }
}
