import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUserId: any;

  constructor(private logServ: LoginService) { }

  ngOnInit() {
    this.logServ.getCurrentLoggedIn().subscribe( ({data}) => {
      console.log(data);
      this.currentUserId = data.user.id});
  }

}
