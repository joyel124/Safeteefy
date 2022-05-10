import {EventEmitter, Injectable, Output} from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, retry, throwError } from "rxjs";
import {Guardian} from "../model/guardian";

@Injectable({
  providedIn: 'root'
})
export class GuardiansService {

  basePath='http://localhost:3000/api/v1/guardians';
  httpOptions={
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  @Output() SetCurrent: EventEmitter<any>=new EventEmitter();
  constructor(private http: HttpClient) { }
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default Error Handling
      console.log(`An error occurred ${error.status}, body was: ${error.error}`);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // Return Observable with Error Message to Client
    return throwError(() => new Error('Something happened with request, please try again later.'));
  }

  // Create Guardian
  create(item: any): Observable<Guardian> {
    return this.http.post<Guardian>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Get Guardian by id
  getById(id: any): Observable<Guardian> {
    return this.http.get<Guardian>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Get all Guardians
  getAll(): Observable<Guardian> {
    return this.http.get<Guardian>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  update(id: any, item: any): Observable<Guardian> {
    return this.http.put<Guardian>(`${this.basePath}/${id}`, JSON.stringify(item),this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Delete Guardian
  delete(id: any): Observable<Guardian> {
    return this.http.delete<Guardian>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

}
