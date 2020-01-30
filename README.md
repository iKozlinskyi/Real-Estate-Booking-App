# Real-Estate-Booking-App

#### Brief description:

A user can browse available real estate, filter it by name, price, location, see result of search on a map.

available features:


- Filtering of results (by name, city, price)
- Sorting (alphabetically, by price) - ASC and DESC
- Adding new real estate
- Representation of search results on a map
- Authorization, registration
- Pagination
- Commenting
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
- Open `../src/main/resources/application.proterties`
- Add your username and password to config file to use database
- `cd ../../../`
- `mvn clean install` - this will generate the executable *fat-jar*
- `cd target/`
- `java -jar real-estate-booking-app-0.0.1-SNAPSHOT.jar`

Now the app is running on http://localhost:8080

You can also use your favourite IDE and start the project with its tools.

To run the front-end in dev mode, use `npm run`, which starts local server on http://localhost:3000. **But** you need the Java server running as a data source.