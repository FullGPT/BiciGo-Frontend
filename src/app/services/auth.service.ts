import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserDtoModule } from '../models/userDto.module';
import { Observable, throwError } from 'rxjs';
import { LoginUser } from '../models/login-user';
import { JwtDTO } from '../models/JwtDTO';
import { catchError, retry } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'https://bicigo-service.onrender.com/api/leadyourway/v1/auth/';

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      // Default error handling
      console.log(`An error occurred: ${error.error.message}`)
    } else {
      // Unsuccessful response error code returned from backend
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // Return Observable with Error Message to Client
    return throwError('Something happened with request, please try again later');
  }

  public newuser(newUser: UserDtoModule): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'register', newUser)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  public login(loginUser: LoginUser): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authURL + 'login', loginUser)
    .pipe(
      retry(2),
      catchError(this.handleError));;
  }
}