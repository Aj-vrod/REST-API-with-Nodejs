# REST-API-with-Nodejs

<a href="https://twitter.com/VarelaAmmy" target="_blank">
  <img src="https://img.shields.io/badge/Ammy's%20Twitter-Follow-blue">
</a>

A REST API for employees to book a seat in the office

## Table of Contents
* Overview
* Authentication
* Endpoints
* Responses

## Overview

<p> This API serves as a booking agenda for employees of a company to book a seat in a/some room(s). This project was as a challenge for me as I was determined to build an API with Node.js, so I spent two days studying the framework full time and from scratch, and then I designed and wrote this REST API in the next four days. </p>
<p> I decided to use Express.js on the server side, as it is a very complete and simple module which offers tons of possibilities. In addition, Reading the documentation was easy since it is very well written. As for the database, I chose to use a local database because in that way I could write my own queries for my own requirements, which was also challenging. </p>

Deployed [here](https://office-booking-api.herokuapp.com/)

## Dependencies
`Node ^10.18.0` <br>
`Express.js ^4.17.1` <br>
`sqlite3 ^3.32.3` <br>
`jsonwebtoken ^8.5.1` <br>
`md5 ^2.3.0` <br>
For testing: <br>
`jest ^26.6.3`

## How to use
1. Create your new user manually inserting an unique name
2. Log in with your name to receive a secret token (See Endpoints)
3. Find rooms and seats availability (See Endpoints)
4. Go to the create booking endpoint (See Endpoints) and send your authorization token in headers with the seat Id and the specific date for the booking in the body
5. To delete a booking, you must be person who booked it. Send the secret token together with the booking Id to the DEL endpoint (See Endpoints)

## Authentication
I used jwt for authentication. Any registered user in the database is allowed to log in and receive a secret token as confirmation of his or her successful authentication. Then, this token must be used as authorization token to create a booking or to delete one that belongs to you.

## Endpoints
There are several routes but the main ones are:
* `/rest/login POST` - for user authentication
* `/rest/rooms GET` - to see all rooms
* `/rest/seats GET` - to see all seats
* `/rest/bookings` GET - to see all bookings starting two weeks ago
* `/rest/bookings` POST - to create a booking
* `/rest/booking/:id` DELETE - to delete a booking

## Responses
Every response that stores an instance of room, seat or booking must be in JSON format.
In case of errors in the information provided by the user, it will return a list of the error details and some extra data.
For any other error, a 500 response will return.

## License
MIT License
Copyright (c) 2021 Ammy Varela

