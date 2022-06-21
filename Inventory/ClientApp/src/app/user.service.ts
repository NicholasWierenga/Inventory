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
  email: string = "";
  badLogin: boolean = false;
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

  newestUser(): Observable<User> {
    return this.http.get<User>(this.urlRoot + "user/newestUser");
  }

  getUsers(): void {
    if (this.allUsers === undefined) { // This is to avoid calling all users everytime the user decides to switch the page, which is taxing.
    //                                    This should never cause an issue as when we add/update an user, we always add/update in allUsers accordingly.
      this.getAllUsers().subscribe((Users) => 
      this.allUsers = Users
      );
    }
  }

  login(email: string): void { // 2 dfferent users cannot have the same email, so we use that as the unique identifier.
    this.badLogin = false;
    
    if (this.allUsers.find((user) => user.email.toLowerCase() === email.toLowerCase()) !== undefined) {
      this.loggedInUser = this.allUsers.find((user) => user.email.toLowerCase() === email.toLowerCase())!; // This is weird since it has to search through all users twice, so we should rework it
    }
    else {
      this.badLogin = true;
    }
  }

  testLogin(): void {
    this.badLogin = false;
    
    this.loggedInUser = this.allUsers[0];
  }

  logout(): void {
    let noUser!: User;
    this.loggedInUser = noUser; // This is to set loggedInUser back to being undefined.
    this.email = "";
  }
}