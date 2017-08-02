# GraphCool with Angular

## GraphQL schema

```
type Story {
  id: ID! @isUnique
  text: String!
  isPublished: Boolean @defaultValue(value: "false")
  author: Author! @relation(name: "AuthorStories")
}

type Author {
  id: ID! @isUnique
  age: Int
  name: String!
  stories: [Story!]! @relation(name: "AuthorStories")
}
```

### Static Directives

`@isUnique`

```
# the `Post` type has a unique `slug` field
type Post {
  slug: String @isUnique
}
```

`@relation`

```
# the types `Post` and `User` are connected via the `PostAuthor` relation
type Post {
  user: User! @relation(name: "PostAuthor")
}

type User {
  posts: [Post!]! @relation(name: "PostAuthor")
}
``` 

`@defaultValue(value: String!)`

```
# the `title` and `published` fields have default values `New Post` and `false`
type Post {
  title: String! @defaultValue(value: "New Post")
  published: Boolean! @defaultValue(value: "false")
}
```
Temporary directives, after one update should be removed

```
# Renaming the `Post` type to `Story`, and its `text` field to `content`
type Story @rename(oldName: "Post") {
  content: String @rename(oldName: "text")
}
```

```
The temporary directive @migrationValue(value: String!) is used to migrate the value of a scalar field. 
```

### System Articfacts

User
File
```
contentType:
name: String
secret: String
size: Integer
url: String
```

id field

`createdAt` and `updatedAt`

### Migrations or schema changing

1. Adding types is simple add or remove sections
2. Renaming types 
```
type User implements Node {
  id: ID!
  name: String!
  stories: [Post!]! @relation(name: "UserStories")
}

type Post implements Node @rename(oldName: "Story") {
  id: ID!
  isPublished: Boolean!
  text: String!
  slug: String! @isUnique
  tags: [String!]
  user: User! @relation(name: "UserStories")
}
```
3. Adding a new field is adding secton with `@migartion`
```
type Story implements Node {
  id: ID!
  name: String!
  description: String! @migrationValue(value: "No description yet")
  isPublished: Boolean @migrationValue(value: "true") @defaultValue(value: "false")
  length: Int
}
```
4. Removing existing field, just delete lines
5. Renaming fields using `@rename`
```
type Story implements Node {
  id: ID!
  name: String!
  isPublished: Boolean!
  information: String! @rename(oldName: "description")
  isPublished: Boolean @defaultValue(value: "false")
  length: Int
}
```
6. For type change of fields, to string doesnot need any migartion value, to other needs, to required needs default value, to optional no need
```
type Story implements Node {
  id: ID!
  name: Boolean! @migrationValue(value: "true") // was string
  length: String!
}
```
```
type Story implements Node {
  id: ID!
  name: Boolean! @migrationValue(value: "true") // was optional
  length: Int! @migrationValue(value: "0") // was optional
}
```
7. Migrating relations. Singular relation fields can be optional, but plural relation fields are always required. Adding and removing relations are straight. Renaming relation
```
type User implements Node {
  id: ID!
  name: String!
  stories: [Story!]! @relation(name: "UserOnStory") // was "UserStories"
}

type Story implements Node {
  id: ID!
  isPublished: Boolean!
  text: String!
  slug: String! @isUnique
  tags: [String!]
  user: User! @relation(name: "UserOnStory") // was "UserStories"
```



