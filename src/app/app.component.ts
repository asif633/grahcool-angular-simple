import { Component } from '@angular/core';
import { ApolloQueryObservable, Apollo } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  constructor(private apollo: Apollo) { }

}
