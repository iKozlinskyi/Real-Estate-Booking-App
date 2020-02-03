# Real-Estate-Booking-App

#### Demo:

**App is available on https://real-estate-booking-app.herokuapp.com/**

Please, allow up to 2 minutes for application start. Due to Heroku policy, app goes to sleep after 30 minutes without any activity. Since app is started, pages should be loaded in normal time.

#### Brief description

This is a full-stack app, which serves as a booking platform for real estate.
Server side runs on Java, supplemented by Spring framework and its infrastructure (Spring MVC, Spring Security, Spring Data JPA). 
MySQL database used as a datasource.

Client side is developed with React in a form of SPA, all pages are responsive.

The client side is connected to server through *REST-api* (although only the most necessary endpoints implemented).

The app is supported by majority of popular web-browsers, also was tested on *IE11*.

#### Available features:

- Filtering of results (by name, city, price)
- Sorting (alphabetically, by price) - ASC and DESC
- Adding new real estate (also editing and deletion)
- Representation of search results on a map
- Authorization, registration
- Pagination
- Commenting (and deletion of comments)
- Booking of real estate (although it is not possible to see the user`s booking yet, only booked data)

## Prerequisites

To run this app locally, you need:

- Java compiler
- maven
- node and npm
- MySQL database up and running - initial data will be loaded automatically

## Running executable *fat-jar*

- Clone this repo
- `cd ./Real-Estate-Booking-App/frontend/` to get to front end folder
- `npm install` to install all req'd dependencies
- `npm run build` to generate client resources
- Open `../src/main/resources/application.properties` - add your username and password to config file to use database
- `cd ../`
- `mvn clean install` - this will generate the executable *fat-jar*
- `java -jar target/real-estate-booking-app-0.0.1-SNAPSHOT.jar`

Now the app is running on http://localhost:8080

You can also use your favourite IDE and start the project with its tools.

To run the front-end in dev mode, use `npm run`, which starts local server on http://localhost:3000. **But** you need the Java server running as a data source.