NOTE: to copy this readme structure simply click on `Raw` on the top right of this gist. There you have the content in the basic [Markdown syntax](https://www.markdownguide.org/basic-syntax/) used in readme files. Then paste it on a README.md file in your repository and fill the information. Always do this directly from VS code, not from github. DON'T ADD THIS NOTE TO YOUR README. Also make sure to remove any notes from this template.

# TANGLE

## [See the App!](https://tangle-web.netlify.app/)

![App Logo](https://res.cloudinary.com/dtvuykwtv/image/upload/v1729589103/bpe9xnuncma0drfvji7t.jpg)

## Description
 TANGLE is a project presented by two junior coders. In the struggle to find work we found the need to show our portfolios in a dynamic and agile way. Not too centered in the code but more in the final product. For piers and recruiters to be able to see basic info immediately and jump in a deployed demo right away.

#### [Client Repo here](https://github.com/diegoldc/tangle-app)
#### [Server Repo here](https://github.com/diegoldc/tangle-server)

## Backlog Functionalities

We would love to add a messaging system to the platform

## Technologies used

- JavaScript
- Express
- Node.js
- MongoDB
- Cloudinary

# Server Structure

## Models

User model

```javascript

Users:{
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  firstName: String
  lastName: String
  img: String
  linkedin: String
  github: String
  tech: [Strings]
  following: [{type: Schema.Types.ObjectId,ref:'User'}]
  medals:{
    projects: {type: String, enum:  ["bronce","silver","gold"] }
    comments: {type: String, enum:  ["bronce","silver","gold"] }
    following: {type: String, enum:  ["bronce","silver","gold"] }
    followers: {type: String, enum:  ["bronce","silver","gold"] }
    likes: {type: String, enum:  ["bronce","silver","gold"] }
  }
}

```

Project model

```javascript
Projects:{
  name:  {type: String, required: true},
  github: String
  deployment: String
  creationDate:  {type: Date, required: true},
  description: String
  screenshots: [String]
  tech: [String]
  user: [{type: Schema.Types.ObjectId,ref:'User'}]
  collaborators: [{type: Schema.Types.ObjectId,ref:'User'}]
  likes: [{type: Schema.Types.ObjectId,ref:'User'}]
}
```

Comments model

```javascript

Comments:{
  content: {type: String, required: true},
  project: {type: Schema.Types.ObjectId,ref:'Project'}
  user: {type: Schema.Types.ObjectId,ref:'User'}
}

```

## API Endpoints (backend routes)

  | HTTP Method | URL                                | Request Body                                                                 | Success status | Error Status | Description                                                                                      |
| ----------- | ---------------------------------- | ---------------------------------------------------------------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------ |
| POST        | `/api/auth/signup`                 | {username, password, name}                                                   | 201            | 400          | Crea un usuario                                                                                  |
| POST        | `/api/auth/login`                  | {username, password}                                                         | 200            | 400          | Inicia sesión                                                                                    |
| GET         | `/api/auth/verify`                 |                                                                              | 200            | 401          | Verifica credenciales del usuario                                                                |
| GET         | `/api/projects/page/:page`         |                                                                              | 201            | 404          | Devuelve los proyectos ordenados por fecha                                                       |
| GET         | `/api/projects/projectId`          |                                                                              | 200            | 404          | Devuelve la información de un proyecto específico                                                |
| GET         | `/api/projects/tech/:techId`       |                                                                              | 200            | 404          | Devuelve los proyectos que contienen una tecnología                                               |
| GET         | `/api/projects/user/:userId`       |                                                                              | 200            | 404          | Devuelve todos los proyectos de un usuario                                                       |
| POST        | `/api/projects/my-network`         | {userArray}                                                                  | 201            | 404          | Devuelve todos los proyectos de los usuarios que sigue un usuario                                |
| POST        | `/api/projects`                    | {userId, technologies, description, creationDate, screenshots, gitHub, deployment, likes} | 201 | 401          | Crea un nuevo proyecto                                                                           |
| PATCH       | `/api/projects/un-likes/:projectId`| {userId}                                                                     | 200            | 404          | Actualizar "likes" de un proyecto                                                                |
| PATCH       | `/api/projects/collabs/:projectId` | {userId}                                                                     | 200            | 404          | Agrega un colaborador al proyecto                                                                |
| PUT         | `/api/projects/:projectId`         | {userId, technologies, description, creationDate, screenshots, gitHub, deployment, likes} | 202 | 404          | Actualiza un proyecto                                                                            |
| DELETE      | `/api/projects/:projectId`         |                                                                              | 202            | 404          | Elimina un proyecto                                                                              |
| GET         | `/api/users/find`                  |                                                                              | 200            | 404          | Devuelve los datos de los usuarios que cumplen el parámetro de búsqueda                          |
| GET         | `/api/users/:userId`               |                                                                              | 200            | 404          | Devuelve los datos de un solo usuario                                                            |
| GET         | `/api/users/following/:userId`     |                                                                              | 200            | 404          | Devuelve todos los usuarios que sigue el usuario del ID                                           |
| GET         | `/api/users/followers/:userId`     |                                                                              | 200            | 404          | Devuelve todos los usuarios que siguen al usuario del ID                                          |
| GET         | `/api/users`                       |                                                                              | 200            | 404          | Devuelve todos los usuarios (solo id, username e imagen)                                          |
| PATCH       | `/api/users/follow/:userId`        | {following}                                                                  | 202            | 404          | Suma el ID de un usuario al que comenzaras a seguir                                               |
| PATCH       | `/api/users/un-follow/:userId`     | {following}                                                                  | 200            | 404          | Asigna el valor pasado al atributo "following"                                                    |
| PATCH       | `/api/users/:userId/profile`       | {username, firstName, lastName, img, linkedin, github, tech}                 | 202            | 404          | Actualiza perfil del usuario                                                                     |
| PATCH       | `/api/users/:userId/password`       | {password}                                                                  | 200            | 404          | Cambia la contraseña del usuario                                                                 |
| GET         | `/api/comments/`                   |                                                                              | 200            | 404          | Devuelve todos los comentarios                                                                   |
| GET         | `/api/comments/project/:projectId` |                                                                              | 200            | 404          | Devuelve todos los comentarios de un proyecto                                                    |
| GET         | `/api/comments/user/:userId`       |                                                                              | 200            | 404          | Devuelve todos los comentarios que hizo un usuario                                               |
| POST        | `/api/comments`                    | {content, projectId}                                                         | 201            | 404          | Crea un comentario                                                                               |
| PUT         | `/api/comments/:commentId`         | {content, projectId}                                                         | 200            | 400          | Edita el contenido del comentario                                                                |
| DELETE      | `/api/comments/:commentId`         |                                                                              | 202            | 404          | Elimina un comentario                                                                            |
| POST        | `/api/upload-img`                  | {image}                                                                      | 200            | 404          | Sube un archivo a cloudinary y devuelve un URL
## Links

### Collaborators

[Diego Lazaro](https://github.com/diegoldc)

[Juan Palazzo](https://github.com/TanoPalazzo14)

### Project

[Repository Link Client](https://github.com/diegoldc/tangle-app)

[Repository Link Server](https://github.com/diegoldc/tangle-server)

[Deploy Link](https://tangle-web.netlify.app/)

### Trello

[Link to your trello board](https://trello.com/invite/b/670d3d51e9e164f58cb61d1b/ATTIae9dbe83292b812432d96fc4770754894B6375C4/proyecto-modulo-3)

### Slides

[Slides Link](www.your-slides-url-here.com)