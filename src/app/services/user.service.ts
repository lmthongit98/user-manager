import { catchError } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loginStatus = new Subject<boolean>();

  private usersUrl = 'http://localhost:3000/users';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

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
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  constructor( private http : HttpClient ) { }


  public getUsers(): Observable<User[]> {
    const url = this.usersUrl
    return this.http.get<User[]>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

   /** GET hero by id. Will 404 if id not found */
   getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url)
    .pipe(catchError(this.handleError));
  }


  public addUser(newUser: User): Observable<User> {
    const url = this.usersUrl
    return this.http.post<User>(url, newUser, this.httpOptions)
      .pipe(catchError(this.handleError))
  }

  public deleteUser(user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete<User>(url, this.httpOptions)
      .pipe(catchError(this.handleError))
  }

  updateUser(user: User): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.usersUrl}/${id}`;
    return this.http.put<User>(url, user, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  sendLoginStatus(isLogin : boolean){
    this.loginStatus.next(isLogin);
  }

  getLoginStatus():Observable<any>{
    return this.loginStatus.asObservable();
  }

}
