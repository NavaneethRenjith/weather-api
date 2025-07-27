# Weather API Service

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

A simple and robust backend service for fetching weather data and managing a user's favorite locations.

## About The Project

This project is a backend API built with Node.js, Express, and TypeScript. It provides endpoints for user authentication, fetching real-time weather data from an external source, and allowing authenticated users to save and manage a list of their favorite locations.

---

## 🚀 Live API

You can test the live, deployed API at the following base URL.

**Base URL:** `https://weather-api-s2e8.onrender.com/`

---

## Getting Started

Follow these instructions to get a local copy up and running for development and testing.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (which includes npm)
- A code editor like [VS Code](https://code.visualstudio.com/)

### Installation & Running

1.  **Clone the repository**

    ```sh
    git clone <YOUR_REPOSITORY_URL>
    cd <YOUR_PROJECT_DIRECTORY>
    ```

2.  **Install NPM packages**

    ```sh
    npm install
    ```

3.  **Set up Environment Variables**
    Copy the example environment file. Then, open the new `.env` file and add your secret keys (e.g., your own weather API key).

    ```sh
    cp .env.example .env
    ```

    Your `.env` file should look like this:

    ```env
    PORT=3000
    API_WEATHER_KEY=your_secret_weather_api_key
    JWT_SECRET=your_jwt_secret_key
    ```

4.  **Build the project**
    This will compile the TypeScript code into JavaScript.

    ```sh
    npm run build
    ```

5.  **Run the server**
    ```sh
    npm start
    ```
    The server should now be running locally on `http://localhost:3000`.

---

## API Endpoints

You can use an API client like [Postman](https://www.postman.com/) to test the following endpoints. Remember to prepend the base URL: `https://weather-api-s2e8.onrender.com`

### 🔐 Authentication

#### `POST /signup`

Creates a new user account.

- **URL:** `https://weather-api-s2e8.onrender.com/signup`
- **Request Body:**
  ```json
  {
    "userName": "someusername",
    "password": "somepassword"
  }
  ```

#### `POST /login`

Logs in an existing user and returns a JWT.

- **URL:** `https://weather-api-s2e8.onrender.com/login`
- **Request Body:**
  ```json
  {
    "userName": "someusername",
    "password": "somepassword"
  }
  ```
- **Response:**
  On success, you will receive a JSON object containing an `accessToken`. Include this token in the `Authorization` header for protected routes (e.g., `Authorization: Bearer <your_token>`).

#### `POST /logout`

Logs out the user.

- **URL:** `https://weather-api-s2e8.onrender.com/logout`

### ☀️ Weather Data

#### `GET /weather`

Fetches weather data for a specific location.

- **URL:** `https://weather-api-s2e8.onrender.com/weather`
- **Query Parameters:**

  - Provide `city` **OR** `lat` and `long`.
  - Example: `.../weather?city=London`
  - Example: `.../weather?lat=40.7128&long=-74.0060`

- **Example Response:**
  ```json
  {
    "city": "Delhi",
    "temperature": 34,
    "description": "Haze",
    "humidity": 45,
    "windSpeed": 5.1
    // ... and other relevant weather data
  }
  ```

### ⭐ Favorites

These routes require authentication. You must include the JWT in the `Authorization` header.

#### `POST /favourites/save`

Saves a location's weather data to the user's favorites list.

- **URL:** `https://weather-api-s2e8.onrender.com/favourites/save`
- **Request Body:**
  - Pass the full JSON object received from the `/weather` endpoint.

#### `GET /favourites`

Retrieves the list of all favorite locations for the logged-in user.

- **URL:** `https://weather-api-s2e8.onrender.com/favourites`

#### `DELETE /favourites/remove/:id`

Removes a specific location from the user's favorites list.

- **URL:** `https://weather-api-s2e8.onrender.com/favourites/remove/:id`
- **URL Parameter:**
  - `:id` - The unique identifier of the favorite entry to be deleted.
