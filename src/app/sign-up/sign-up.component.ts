import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  
  email: string;
  password: string;
  currentUserId: any;
  msg: any;

  constructor(private logServ: LoginService) { }

  ngOnInit() {
    this.logServ.getCurrentLoggedIn().subscribe( ({data}) => this.currentUserId = data.id);
  }

  signup(){
    this.logServ.signUp({email: this.email, password: this.password});
    // .subscribe(
    //   ({data}) => console.log(data),
    //   ({data}) => {console.log(data)}
    // );
  }

}
