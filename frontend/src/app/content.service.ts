import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Content } from './content';
import { Reply } from './reply';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ContentService {
  private contentUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  // GETTERS

  /** Get all content posts */
  getContentPosts(): Observable<Content[]> {
    const url = `${this.contentUrl}/contents`;
    return this.http.get<Content[]>(url)
      .pipe(
        tap(_ => this.log('Fetched all content entries.')),
        catchError(this.handleError<Content[]>('getContentPosts', []))
      );
  }

  /** Get content replies */
  getContentReplies(contentId: number): Observable<Reply[]> {
    const url = `${this.contentUrl}/contents/replies?contentId=${contentId}`;
    return this.http.post<Content[]>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`Fetched replies for content id [${contentId}]`)),
        catchError(this.handleError<Reply[]>('getContentReplies'))
      );
  }

  // SETTERS

  postContent(content: Content): Observable<Content> {
    const url = `${this.contentUrl}/contents/post`;
    return this.http.post<Content>(url, content, httpOptions)
      .pipe(
        tap(_ => this.log(`Posted content for new content id [${content.id}]`)),
        catchError(this.handleError<Content>('postContent'))
      );
  }

  postContentReply(reply: Reply, contentId: number): Observable<Reply> {
    const url = `${this.contentUrl}/contents/replies/post/${contentId}`;
    return this.http.post<Reply>(url, reply, httpOptions)
      .pipe(
        tap(_ => this.getContentReplies(contentId)),
        catchError(this.handleError<Reply>('postContentReply'))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(`ContentService: ${message}`);
  }

}
