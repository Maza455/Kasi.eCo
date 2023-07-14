import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Trader } from '../trader';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root' 
})
export class TraderService {
  deleteProduct(id: any) {
    throw new Error('Method not implemented.');
  }
  editProduct(product: any) {
    throw new Error('Method not implemented.');
  }
  addProduct(formData: FormData) {
    throw new Error('Method not implemented.');
  }
  private tradersUrl = 'https://kasi-e-co.vercel.app/v1/traders/';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** GET traders from the server */
  getTraders(): Observable<any> {
    return this.http.get<any>(this.tradersUrl)
      .pipe(
        tap(_ => this.log('fetched traders')),
        catchError(this.handleError<any>('getTraders'))
      );
  }

  /** GET trader by id. Return `undefined` when id not found */
  getTraderNo404(id: number): Observable<Trader> {
    const url = `${this.tradersUrl}/?id=${id}`;
    return this.http.get<Trader[]>(url)
      .pipe(
        map(traders => traders[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} trader id=${id}`);
        }),
        catchError(this.handleError<Trader>(`getTrader id=${id}`))
      );
  }

  /** GET trader by id. Will 404 if id not found */
  getTrader(id: any): Observable<Trader> {
    const url = `${this.tradersUrl}/${id}`;
    return this.http.get<Trader>(url).pipe(
      tap(_ => this.log(`fetched trader id=${id}`)),
      catchError(this.handleError<Trader>(`getTrader id=${id}`))
    );
  }

  getTraderDetails(id: number): Observable<any> {
    const url = `${this.tradersUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      map(response => response.data)
    );
  }

  getAll(id: string | null): Observable<any> {
    const url = `${this.tradersUrl}/${id}`;
    return this.http.get<any>(url)
      .pipe(
        tap(_ => this.log(`fetched traders for id=${id}`)),
        catchError(this.handleError<any>('getAll'))
      );
  }

  getTraderDetail(traderId: any): Observable<any> {
    const url = `${this.tradersUrl}/${traderId}`;
    return this.http.get<any>(url)
      .pipe(
        tap(_ => this.log(`fetched trader detail for id=${traderId}`)),
        catchError(this.handleError<any>('getTraderDetail'))
      );
  }

  /* GET traders whose name contains search term */
  searchTraders(term: string): Observable<Trader[]> {
    if (!term.trim()) {
      // if not search term, return empty trader array.
      return of([]);
    }
    return this.http.get<Trader[]>(`${this.tradersUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found traders matching "${term}"`) :
         this.log(`no traders matching "${term}"`)),
      catchError(this.handleError<Trader[]>('searchTraders', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new trader to the server */
  addTrader(trader: any): Observable<Trader> {
    return this.http.post<Trader>(`${this.tradersUrl}/trader-signup`, trader).pipe(
      tap((newTrader: Trader) => this.log(`added trader w/ id=${newTrader.id}`)),
      catchError(this.handleError<Trader>('addTrader'))
    );
  }

  /** DELETE: delete the trader from the server */
  deleteTrader(id: any): Observable<Trader> {
    const url = `${this.tradersUrl}/${id}`;

    return this.http.delete<Trader>(url).pipe(
      tap(_ => this.log(`deleted trader id=${id}`)),
      catchError(this.handleError<Trader>('deleteTrader'))
    );
  }

  /** PUT: update the trader on the server */
  updateTrader(trader: any): Observable<any> {
    const url = `${this.tradersUrl}/${trader.id}`; // Update the URL with the trader's ID

    return this.http.put(url, trader, this.httpOptions).pipe(
      tap(_ => this.log(`updated trader id=${trader.id}`)),
      catchError(this.handleError<any>('updateTrader'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  /** Log a TraderService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`TraderService: ${message}`);
  }

  // Method for navigation
  navigateToTraderDetails(traderId: any): void {
    // Your navigation logic here
    console.log(`Navigating to trader details for id=${traderId}`);
  }
}
