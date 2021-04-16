# REST-API-with-Nodejs
A REST API for employees to book a seat in the office

# Table of Contents
* Overview
* Authentication
* Endpoints
* Responses

# Overview
This API serves as a booking agenda for employees of a company to book a seat in a specific room. It was built with Nodejs, port:3000 and as the database used in this case is *SQLite3*, there will be limitations for the amount of data that can be stored, however it will be enough for a small/med company. At the moment, it has not been deployed, but feel free to clone it. 
Any feedback is welcome.

# Authentication
I used jwt for authentication. Any registered user in the database, is allowed to log in and receive a secret token as confirmation of his or her authentication. Then, this token must be used as authorization token to create a booking or to delete one that belongs to you.

# Endpoints
There are several routes but the main ones are:
* http://localhost:3000/rest/login POST - for user authentication
* http://localhost:3000/rest/rooms GET - to see all rooms
* http://localhost:3000/rest/seats GET - to see all seats
* http://localhost:3000/rest/bookings GET - to see all bookings starting two weeks ago
* http://localhost:3000/rest/bookings POST - to create a booking
* http://localhost:3000/rest/booking/:id DELETE - to delete a booking

# Responses
Every response that stores an instance of room, seat or booking must be in JSON format.
In case of errors in the information provided by the user, it will return a list of the erros and some extra data.
For any other error, a 500 response will return

