# Adventurebnb


##  [Try live app here!](http://hotel-search-service.surge.sh/) 


![hoempage](/images/homepage-img.png "homepage")


## About the App

This app is hotel searching that allows users to search for hotels using a city name, zip code, and hotel name in the US. Users can login and edit their profile information, as well as save search results as a accommodation plan.   

## Features

1. When using the hotel search feature, users can search for hotels using US city names, zip codes, and hotel names. Additionally, you can enter the check-in and check-out dates and the number of guests for searching.  
2. If users search by city name and zip code, it will show a list of hotel in the city or zip code. Users can view detailed information about the hotel that interests them by selecting it from the list.    
3. If users search by hotel name or select the hotel from city/ zip code hotels list page, it will show a list of hotel room types depending on how many guests will be visiting the hotel.  
4. Once a user creates an account, they can edit their profile and save search results as a accommodation plan.
5. Users can delete a plan and mark it as complete.  

## User Flow


![hoempage](/images/userflow.png "homepage")  

## APIs  

[Hotel Content API](https://api.test.hotelbeds.com/hotel-content-api/1.0/hotels)  

[Google Map API](https://www.google.com/maps/embed/v1/place)  


## Built With  

The coding languages, frameworks, and libraries that I used to build this project:  

Frontend

* JavaScript
* React
* HTML
* CSS
* Axios  

Backend

* Node.js
* Express.js
* PostgreSQL
* JSON Schema
* bcrypt

## How to Run the Project

To get a local copy up and running follow these steps:  

### Clone Repos

Download the [HotelSearchService-Frontend](https://github.com/wei1009/HotelSearchService-Frontend) ZIP or enter the following in the desired directory in your terminal:  

 	`https://github.com/wei1009/HotelSearchService-Frontend.git`  

Download the [HotelSearchService-Backend](https://github.com/wei1009/HotelSearchService-Backend) ZIP or enter the following in the desired directory in your terminal: 


 	`https://github.com/wei1009/HotelSearchService-Backend.git`  

### Library Installations 

Install the libraries in each frontend and backend repo  

	`npm install`

### API KEY setting  

Create .env file:  

Set up API _ KEY and API _ SECRET from [Hotel Content API](https://api.test.hotelbeds.com/hotel-content-api/1.0/hotels)  
Set up GOOGLE_API_KEY from [Google Map API](https://www.google.com/maps/embed/v1/place) 



### Postgres Installation  

Install [Postgres](https://www.postgresql.org/).  

Create a database "hotel" in your terminal in the backend directory.

	`createdb hotel`   

Run the following command in your terminal in the backend directory to create the database tables and seed data to database. (Please wait a few seconds. )  

	`psql -d hotel -f hotel-schema.sql -f hotel-seed.sql`  

### Start the server   

Frontend:  

	`npm start`  
Backend:  

	`node server.js`


### Test the frontend directory

	`npm test`
