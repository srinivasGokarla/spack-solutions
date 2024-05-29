#  Assignment
# Subcription MERN App

## Introduction
A mern stack application for managing subscriptions and upgrade plans within.The application allow users to Register user,login user and buy upgrade plans.

## Features
The key features of application.

- validation and error handling for API requests
- authentication and authorization mechanisms to ensure secure access to the API endpoints
- APIs for retrieving User details such as existing plans
- Upgrade the subscriptions 

## Deployed link
[link](https://spack-frontend.vercel.app/)

## Demo link
[link](https://drive.google.com/file/d/15CMStqEavsbvPdaAb1tlzK6JjVHdbHeh/view?usp=drive_link)

## Snapshots
- Register Page

<img width="947" alt="register_desktop view" src="https://github.com/srinivasGokarla/spack-solutions/assets/87422030/00bdf31c-93fc-4c04-b49b-81cb6d264afa">


- Login Page

  
<img width="960" alt="login_desktop" src="https://github.com/srinivasGokarla/spack-solutions/assets/87422030/56ec16b5-e559-4b9c-9c60-5cdf263444d1">


- Profile Page


<img width="959" alt="profile_desktop" src="https://github.com/srinivasGokarla/spack-solutions/assets/87422030/d3007067-2e1a-44e3-880d-d0653f029cf0">

- Upgrading Plan

  
<img width="949" alt="upgrading_plan" src="https://github.com/srinivasGokarla/spack-solutions/assets/87422030/bf14dfbd-f473-4b22-a6f3-18845ce51207">

## Installation or How to run the app
I created cloud database using MongoDb Atlas. So, if you want to run our code then please read the instructions below :
- Clone our repository `https://github.com/srinivasGokarla/spack-solutions`
- Open the code in your VS code, open Backend folder in the terminal by running `cd Backend`
- Now run `npm install` or `npm i` which will install all the required packages of node
- After installation, now run `npm run server` and  you will see `server is listening on 5900` 
- Simultaneously, open a new terminal and run `cd frontend` by which you get into frontend folder
- Now here, run `npm install` or `npm i` which will install all the required packages of react aswell
- After installation, now run `npm start` and  you will see a new window will be opening in the default browser which is running on port `http://localhost:3000`
- Open MongoDb compass and URL `mongodb://localhost:27017/subscription` which will create database collection named subscription
- Now you see app running, you can click on `Register` to sign in and after that you will be redirected to Home page where you can see your details and upgrade your plan.


## Usage
As there are some validations please follow this when using -
 - Regsiter first with name, username, email and password
 - After registering anytime you can logout and login with your credentials
 - Upgrade clicking on `buy` button

## API Endpoints
Backend Applications provide a list of API endpoints
- GET /content- retrieve content
- POST /register - Register user
- POST /login - User login
- POST /logout - User logout
- POST /test - verify JWT token
- POST /subscribe - Upgrade subscription


## Technology Stack
List and provide a brief overview of the technologies used in the project.

- MongoDB
- Express JS
- React JS
- Node JS
 
 ### Dependencies and packages

#### Backend
- `express-validator` <br/>
   used for validation
- `mongoose`<br/>
  connecting MongoDB to the Node js server
- `jsonwebtoken`<br/>
  generate a token for securely transmitting information
- `nodemon`<br/>
  It monitors your project and automatically restarts when detects any changes.
- `cors`<br/>
  allowing browser should permit the loading resources
- `dotenv`<br/>
  to store “environment variables”

#### Frontend
- `axios`<br/>
  JavaScript library to make HTTP requests or fetching data
- ` Chakra UI` <br/>
  for displaying better css for the UI
- `react-router-dom`<br/>
  implementaion of dynamic routing 
- `react-redux`<br/>
 handling over all state of the website

#### Cloud Deployment

- `Render`
used render for deploying the node js (Backend)

- `vercel`
used vercel for deploying the React JS (frontend)
