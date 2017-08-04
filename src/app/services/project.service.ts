import { Injectable } from '@angular/core';
import { ApolloQueryObservable, Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const query = gql`
{
  allProjects{
    id,
    title
  }
}`

const mutation = gql`
 mutation CreateProject($title: String!, $start: DateTime!){
  createProject(title: $title,start: $start){
    id,
    title
  } 
 }
`

const offSetQuery = gql`
  query OffSetQuery($first: Int, $skip: Int){
    allProjects(first: $first, skip: $skip, orderBy: title_DESC){
      title
    }
  }
`

@Injectable()
export class ProjectService {

    constructor(private apollo: Apollo) { }

    getProjects() {
        return this.apollo.watchQuery({ query: query });
    }

    createProject({ title, start }) {
        return this.apollo.mutate({
            mutation: mutation,
            variables: {
                title,
                start
            }
        });
    }

    fetchMore(projects: ApolloQueryObservable<any>, offset, itemsPerPage, projectsa: any) {
        return projects.fetchMore({
            variables: {
                skip: offset,
                first: itemsPerPage
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult.data) { return prev; }
                return Object.assign({}, prev, {
                    allProjects: [...prev.allProjects, ...fetchMoreResult.data.allProjects],
                });
            },
        });
    }

    getProjectsPage(itemsPerPage) {
        return this.apollo.watchQuery({
            query: offSetQuery,
            variables: {
                skip: 0,
                first: itemsPerPage
            }
        });
    }

}