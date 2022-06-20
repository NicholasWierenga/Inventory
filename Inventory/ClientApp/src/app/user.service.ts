import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  allUsers!: User[];
  loggedInUser!: User;
  urlRoot: string;
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'); // We don't need headers or requestOption, but it makes console less bad.
  requestOptions: Object = {
    headers: this.headers,
    responseType: 'text'
  };

  constructor (private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.urlRoot = baseUrl;
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.urlRoot + "user/showAllUsers");
  }

  createUser(newUser: User): Observable<User> {
    return this.http.post<User>(this.urlRoot + "user/createUser", newUser, this.requestOptions);
  }

  getUsers(): void {
    this.getAllUsers().subscribe((Users) => 
    this.allUsers = Users
    );
  }

  login(email: string) { // 2 dfferent users cannot have the same email, so we use that as the unique identifier.
    if (this.allUsers.find((user) => user.email === email) !== undefined) {
      this.loggedInUser = this.allUsers.find((user) => user.email === email)!; // This is weird since it has to search through all users twice, so we should rework it
    }
  }
}