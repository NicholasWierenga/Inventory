import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  firstName: string = "";
  lastName: string = "";
  address: string = "";
  email: string = "";
  phone: number = undefined!;
  allUsers!: User[];
  //TODO: Give something to indicate to the user if email was already taken or if they have too many or too few digits in the phone number.
  
  constructor( public userService: UserService ) { }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe((Users) => 
    this.allUsers = Users
    );
  }

  createNewUser(): void {
    let newUser: User = {orders: undefined!, id: undefined!, firstName: this.firstName, 
      lastName: this.lastName, address: this.address, email: this.email, phone: this.phone};

    // This is to check if the email is currently being used by another user, 2 users can't have the same email.
    console.log("in create");
    if (this.allUsers.filter((user) => user.email === newUser.email).length === 0) {
      this.userService.createUser(newUser).subscribe((response) => {
        console.log("inside create sub");
        this.allUsers.push(response);
      });
    }
  }

  ngOnInit(): void {
    this.getAllUsers();
  }
}  

