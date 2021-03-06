import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html', 
  styleUrls: ['./new-user.component.css']

})
export class NewUserComponent implements OnInit {
  firstName: string = "" ;
  lastName: string = "";
  address: string = "";
  email: string = "";
  phone: string ="";
  badEmail: boolean = false;
  badFirstName: boolean = false;
  badPhoneNumber: boolean = false;

  
  //TODO: Give something to indicate to the user if email was already taken or if they have too many or too few digits in the phone number.
  
  constructor( public userService: UserService, private router: Router ) { }

  createNewUser(): void {
    this.badEmail = false;
    this.badFirstName = false;
    this.badPhoneNumber = false;
    let newUser: User = {orders: undefined!, id: undefined!, firstName: this.firstName, 
    lastName: this.lastName, address: this.address, email: this.email, phone: this.phone};

    if (newUser.firstName.length === 0) {
      this.badFirstName = true;
    }

    if (this.userService.allUsers.find((user) => user.email === newUser.email) !== undefined) {
      this.badEmail = true; // We use user email as a unique identifier for users.
    }

    if (newUser.phone.length !== 10) {
      this.badPhoneNumber = true;
    }

    if (this.badEmail || this.badFirstName || this.badPhoneNumber) {
      return;
    }

    this.userService.createUser(newUser).subscribe(() => {
      this.getNewestUser();
      this.router.navigate(['']); // Sends us back to the home page.
    });
  }

  getNewestUser(): void { // For when we create a new user. It adds it onto the end of the array instead of us needing to call getAllUsers again.
    this.userService.newestUser().subscribe((user) => {
      this.userService.allUsers.push(user);
      this.userService.loggedInUser = user; // We also automatically login the user after account creation.
    });
  }

  ngOnInit(): void {
    if (this.userService.allUsers.length === 0) {
      this.userService.getUsers();
    }
  }
}