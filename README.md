# Project Title: GALAXYRENTAL

## Introduction
This website offers an online car rental service, targeting individuals seeking convenient and flexible car hiring options. It's designed to simplify the rental process, providing a wide range of vehicles and clear pricing. The motivation behind this website is to improve the car rental experience with easy navigation, transparent information, and personalized services.

## Project Structure
The project's architecture is modular, with each JavaScript file handling specific functionalities:

- `carBrands.js`: Manages car brands list.
- `DataListColumns.js`: Sets up data table columns.
- `dummyCarData.js`: Offers sample car rental data.
- `Places.js`: Lists rental service locations.
- `authErrors.js`: Handles authentication errors.
- `CardComponent.js`: Creates card UI for cars.
- `NavigationBar.js`: Navigation bar component.
- `PrivateRoute.js`: Restricts access to private routes.
- `AlertComponent.js`: Displays alerts and messages.
- `HomePage.js`: Main landing page.
- `LoginPage.js`: User login functionality.
- `ProfilePage.js`: User profile management.
- `ResultPage.js`: Search result display.
- `SignupPage.js`: New user registration.
- `Template.js`: Template for inserting data.
- `DetailsPage.js`: Detailed car information.
- `FAQPage.js`: Frequently asked questions.
- Admin panel files (`AdminPanel*.js`): Manage cars, users, bookings.

## Setup and Installation
**Prerequisites:** Node.js, npm, and Firebase.
**Instructions:** Clone the repository, install dependencies with `npm install`, set up Firebase, and run `npm start` to launch the website locally.

## Key Features
Key features include user authentication, dynamic data visualization, and real-time car booking. These functionalities enhance user experience by offering secure access, interactive data presentation, and efficient booking processes.

## Usage Guide
- **Homepage Navigation:** Users start on the `HomePage.js`, where they can search for car rentals by selecting a pickup place, dates, and car preferences. The page showcases key features and services of your rental service.
- **Account Management:** Through `LoginPage.js` and `SignupPage.js`, users can create a new account or log in to an existing one. `ProfilePage.js` allows users to view and manage their bookings and personal information.
- **Finding and Booking Cars:** Users utilize `ResultPage.js` to view a list of cars matching their search criteria. They can click on a car to view more details on `DetailsPage.js` and proceed to book the car.
- **Navigating the Website:** The `NavigationBar.js` offers links to various pages like Home, Profile, FAQ, and an admin panel, adapting based on user authentication status.
- **Admin Features:** For admins, `Template.js` is used to insert car data into the database. Admin-specific routes are protected by `PrivateRoute.js`.
- **Handling Errors and Alerts:** `AlertComponent.js` and `authErrors.js` provide feedback during user interactions, such as login errors or successful bookings.

## Code Overview
### HomePage.js
The `HomePage.js` file is a React component for the homepage of your website...

(Each component description follows similarly as in the original text...)

### AdminPanelBookingManagement.js
The `AdminPanelBookingManagement.js` file is a React component for managing bookings in the admin panel...

(Descriptions continue for each file as provided in the original text.)


### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
