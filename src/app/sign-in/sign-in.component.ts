import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  
  email: string;
  password: string;
  currentUserId: any;

  constructor(private logServ: LoginService) { }

  ngOnInit() {
    this.logServ.getCurrentLoggedIn().subscribe( ({data}) => this.currentUserId = data.id);
  }

  signin(){
    this.logServ.signIn({email: this.email, password: this.password})
    .toPromise().then(
      (response:any) => localStorage.setItem('token',response.data.signinUser.token)
    ).then(
      () => this.logServ.getCurrentLoggedIn().subscribe( ({data}) => { 
        console.log('logged in ', data.user);
        this.currentUserId = data.user.id
      }
      )
    );
  }

}
