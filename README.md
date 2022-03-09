# This project was built in just one night after reviewing and rehashing Reach, NodeJS, Express, and MySQL.

The intent is to demonstrate different styles of coding, skill level, and comprehension.

## Description of frontend:

The frontend is built in React. It connects with the backend for Restful API calls and display the data accordingly. The styling is based off Bootstrap and kept very simple as more emphasis were placed on clean coding. The front end also continue to utilize JWT token-based authentication/authorization.

The main page is the Housing list page that is open to all viewers. Then user can login to add new listing, edit current listing, or delete existing listing. User will also be able to view profile and add additional user as need.

## What more can I do with this project had I more time?:

I would stress test the app to ensure security is sound such as SQL injection, XSS scripting, verbose message or information leak. There are plenty of library available to create a more secure token transaction and further reinforce the Restful APIs. Additionally, I typically use a single css framework to enhance the appearance. I am experienced in using Bootstrap, Material UI, and Bulma.

## Running the app locally:

1. Download the repo
2. Type `npm install` to ensure you have all dependecies installed
3. Type `npm start`

Viola! The app will start running, and you can view the web in action!
SwaggerUI is utilized with the backend and can be found at `localhost:8080/api-docs`
