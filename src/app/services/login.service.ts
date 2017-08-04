import { Injectable } from '@angular/core';
import { ApolloQueryObservable, Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const currentUserQuery = gql`
query {
  user{
    id
  }
}`

const signupMutation = gql`
mutation SignUpUser($email: String!, $password: String!){
  createUser(role: ADMIN, authProvider: {
    email: {
      email: $email
      password: $password
    }
  }) {
    id
  }
}
`
const signinMutation = gql`
mutation ($email: String!, $password: String!){
  signinUser(email: {
    email: $email
    password: $password
  }) {
    token
  }
}
`

@Injectable()
export class LoginService {

    constructor(private apollo: Apollo) { }

    getCurrentLoggedIn() : ApolloQueryObservable<any>{
        return this.apollo.watchQuery({ query: currentUserQuery, fetchPolicy: 'network-only' });
    }

    signUp({ email, password }) {
        return this.apollo.mutate({
            mutation: signupMutation,
            variables: {
                email,
                password
            }
        }).subscribe(
            ({data}) => console.log(data),
            ({errors}) => console.log(errors)
        );
    }

    signIn({ email, password }) {
        return this.apollo.mutate({
            mutation: signinMutation,
            variables: {
                email,
                password
            }
        });
    }

}