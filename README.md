# GraphCool with Angular

## GraphQL Basic

### Query and Mutation

Query is for reading and Mutation is for writing data to underlying data source.

#### Query on fields

```
{
  hero {
    name
    # Queries can have comments!
    friends {
      name
    }
  }
}
```

##### Query using Arguments

Arguments can go to every level of query. Scalar arguments to transform data.

```
{
  human(id: "1000") {
    name
    height(unit: FOOT)
  }
}
```

##### Aliases

When we query same type using different arguments.

```
{
  empireHero: hero(episode: EMPIRE) {
    name
  }
  jediHero: hero(episode: JEDI) {
    name
  }
}
```

##### Fragments

Purpose is to remove repetition. Best use case when mutiple UI components have same query fields but different arguments.

```
{
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  appearsIn
  friends {
    name
  }
}
```

##### Variables

Passing variables in arguments.

```
query HeroNameAndFriends($episode: Episode) {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
```

and the variable pass, in applications the variable passing will be through code.

```
{
  "episode": "JEDI"
}
```

With `!` sign the variable becomes required. Default value pass `$episode: Episode = "JEDI"`.
Default value used with optional variable.

##### Directives

Directives are used to condition the query.

```
query Hero($episode: Episode, $withFriends: Boolean!) {
  hero(episode: $episode) {
    name
    friends @include(if: $withFriends) {
      name
    }
  }
}
```

Two directives in main graphql `@include` and `@skip`.

#### Mutations

```
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}
```

** Query fields can run in parallel but mutations run in series **

#### Inline Fragments

```
query HeroForEpisode($ep: Episode!) {
  hero(episode: $ep) {
    name
    ... on Droid {
      primaryFunction
    }
    ... on Human {
      height
    }
  }
}
```

Here `Character` is an interface and `Droid` and `Human` are its types.

#### Meta fields

To get the typename or other meta info when query doesnot know about return.

```
{
  search(text: "an") {
    __typename
    ... on Human {
      name
    }
    ... on Droid {
      name
    }
    ... on Starship {
      name
    }
  }
}
```

### Schema

#### Object types and fields

```
type Character { // GraphQL Object
  name: String! // means 
  appearsIn: [Episode]! // Non Nullable, means will return something when queried.
}
```

#### Arguments on fields

```
type Starship {
  id: ID!
  name: String!
  length(unit: LengthUnit = METER): Float
}
```




