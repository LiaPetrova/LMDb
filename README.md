# LMDb - React Project

![Printscreen-Website](https://github.com/LiaPetrova/LMDb/raw/master/src/assets/Printsreen-Project.jpg)

 <a href="https://lmdb-9b2b4.web.app/" target="_blank" rel="noreferrer"> <img src="https://cdn-icons-png.flaticon.com/512/5988/5988117.png" width="30" height="30" color="#fff" background-color="#fff" margin-top="2px"/> </a> Deployed Project: https://lmdb-9b2b4.web.app/
 

## Idea

LMDb (an acronym for Local Movie Database) is an online database of information related to films and television series – including top cast, plot summaries, trivia, ratings, and fan reviews. People can also add shows to their watchlist.

## Application Overview

The application is using React as frontend, Firebase for backend and deployment and is made entirely with custom design using CSS.

## Architecture
This application consist of: 
 - Auth.module - contains Login, Register and My-topics component - which we load lazy
 - Core.module - contains Footer and Header Component,Guards and Interfaces
 - Feature - consist of two Modules
    - Pages.module - contains Home Page and Page Not Found Component
    - Topics.module - contains All-Topics, Details, Edit, New Topic, Single Topic, Comments and Search Topic
 - Services - contains Auth.service (Authentication) and Topic.service (CRUD)
 - Shared.module - contains Util folder with Pipes and Methods used all around the application
 
 
 ## Functionality
 
 ### General Functionality

  - Authenticate users via Firebase
  - CRUD Shows for Admin
  - CRUD Comments on topics
  - GET and display paginated lists of movies and series
  - Watchlist
  - Search for keywords in SHowstitle
  - Sort Movies and Series by different criteria


| **Permissions** | Guest  | Logged in User | Admin  |
| --------------- | -----  | -------------- | -----  |
| Login/ Register | ✔️      | ❌             | ✔️    |
| Home page       | ✔️      | ✔️              |  ✔️     |
| Details         | ✔️      | ✔️              |  ✔️     |
| Watchlist       | ❌      | ✔️              |  ✔️     |
| Write Reviews   | ❌      | ✔️              |  ✔️     |
| React on Reviews| ❌      | ✔️              |  ✔️     |
| Edit Own Reviews| ❌      | ✔️              |  ✔️     |
| Delete Own Reviews| ❌      | ✔️              |  ✔️     |
| Create Show     | ❌     | ❌             |  ✔️    |
| Edit Show       | ❌     | ❌             |  ✔️    |
| Delete Show     | ❌     | ❌             |  ✔️    |
| Admin Products  | ❌     | ❌             |  ✔️    |

 
 ### Guest-User
 
 Guest user can access:
 - Home Page
 - Login/Register Page
 - All Topics Page
 - Details Page (he can also view comments for the topic and how many likes they have, but is not able to like and comment)
 - Search Page

### Logged In User

Logged In User can access:

- Home Page
- All Topics Page
- Details Page:
  - If he is the owner of the topic: 
    - he can edit the topic
    - he can detele the topic and the comments to it
  - Everybody including the owner of the topic:
    - can write comments
    - can like and then unlike comments
    - can see how many like the comments have
    - owner of the comment can detele it
- Search Page
- My Topics Page - the he can browse throw his own topics
  
 
