import { Component } from '@angular/core';
import { ApolloQueryObservable, Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const query = gql`
{
  allProjects{
    title
  }
}`

const mutation = gql`
 mutation CreateProject($title: String!, $start: DateTime!){
  createProject(title: $title,start: $start){
    title
  } 
 }
`
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading: boolean;
  projects: ApolloQueryObservable<any>;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.projects = this.apollo.watchQuery({ query: query });
  }

  getProject(event) {
    this.apollo.mutate({
      mutation: mutation,
      variables: {
        title: event.title,
        start: event.start
      }
    }).subscribe(() => this.projects.refetch()); 
  }

}
