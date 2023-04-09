# BGTati - Angular Project

![Printscreen-Website](https://github.com/LiaPetrova/LMDb/raw/master/src/assets/Printscreen.jpg)

 <a href="https://bgtati.web.app/home" target="_blank" rel="noreferrer"> <img src="https://cdn-icons-png.flaticon.com/512/5988/5988117.png" width="30" height="30" color="#fff" background-color="#fff" margin-top="2px"/> </a> Deployed Project: https://bgtati.web.app/home
 

## Idea

This is a forum application dedicated to help dads all around the world to exchange ideas, share opinion or just chat about dads topics.

## Application Overview

The application is using Angular as frontend, Firebase for backend and deployment, Material Design Spinner and Snackbar, otherwise CSS for the styles.

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
  - CRUD Topics
  - CR*D Comments on topics (no updating required)
  - GET and display paginated lists of topics
  - My Topics
  - Search for keywords in Topic titles

 
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
  
 
