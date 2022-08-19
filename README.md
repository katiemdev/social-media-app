# Social Media App

<!-- Write a short sentence or two about this project and what it does. Be sure to include a link and a screenshot (we're front end devs so we can actually see our work!). -->

- Social media app where you can create an account, post photos, and comment/like on other photos.
- Full-stack Javascript CRUD application
- Uses the MVC architectural design pattern

<!-- **Link to project:** http://recruiters-love-seeing-live-demos.com/ -->

<!-- ![alt tag](http://placecorgi.com/1200/650) -->

## How It's Made:

**Tech used:** HTML/EJS, CSS, JavaScript, Node.js, Express, Mongoose, MongoDB.

This fullstack Javascript app was made using Node.js and Express on the backend. It implements all CRUD functionalities (creating posts, reading pages, liking posts/adding comments, deleting posts). It uses the MVC design pattern to organise the code.

**Middlewares used**:

- _Passport_: uses local strategy. Passport is authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application.
- _EnsureAuth_: EnsureAuth enables us to have protected routes - i.e. routes that only logged in users can access.
  EnsureAuth is part of our middleware. It's a function that checks to see if the user is authenticated. If they are, it goes to their list. If not, it redirects them back to the main page.
- _MethodOverride_: By default, forms can only POST and GET. But with method override, we can also make them do PUTs and DELETEs. Method Override eliminates the need for making multiple fetch requests and event listeners in our client-side JS.
- _Cloudinary_: Place to store images so that they are not all deleted when server restarts.
- _Multer_: middleware that handles file uploading.

<!-- ## Optimizations

_(optional)_

You don't have to include this section but interviewers _love_ that you can not only deliver a final product that looks great but also functions efficiently. Did you write something then refactor it later and the result was 5x faster than the original implementation? Did you cache your assets? Things that you write in this section are **GREAT** to bring up in interviews and you can use this section as reference when studying for technical interviews! -->

## Lessons Learned:

I learned a lot about the benefits of using a structure such as MVC to organise code into simpler, smaller chunks. I also learned about adding authentication features to an app and the different ways to ensure that senestive data, such as passwords, are kept secure. Building this project step-by-step has helped me understand how client requests are made, where they go, how they are handled by the server, and how the server responds.

In the future would like to remake it with React and make it responsive.
