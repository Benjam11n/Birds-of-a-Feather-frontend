<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/benjam11n/Birds-of-a-Feather-frontend">
    <img src="./public/Logo.jpg" alt="Logo" width="160" height="160" style="border-radius: 50%">
  </a>

  <h3 align="center">Birds of a Feather</h3>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

 <img src="./public/dashboard.png" alt="Logo" height="360">

**Note:** This README refers to the frontend of the project. This repository contains the source code for the Birds of a Feather forum's frontend. Created for the **CVWO summer project**, it is the result of approximately two months of learning web development, starting from ground zero since the end of last semester's exams.

**Forum Theme:** The central theme of the forum revolves around birds as I own two budgerigars, and I love birds! The forum is called "Birds of a Feather" as birds of a feather flock together.

I hope you enjoy this website!

### Built With

The frontend of this project uses a comprehensive stack of technologies and frameworks to deliver a modern and responsive web application. Here's a detailed overview of the key components:

- **React**: A dynamic JavaScript library for building interactive user interfaces, providing a seamless user experience.

- **TypeScript**: Enhancing code quality and development efficiency through static typing, TypeScript ensures a more robust and maintainable codebase.

- **Vite**: A fast and efficient build tool that facilitates quick and optimized development and production builds.

- **Shadcn UI**: Styling is powered by the Shadcn UI library, contributing to a visually appealing and cohesive design across the application.

- **React Router**: Ensuring smooth navigation and seamless routing within the application for an intuitive user journey.

- **React Query**: Efficient state management that simplifies data fetching, caching, and updates, contributing to a responsive and interactive user interface.

- **Recharts**: To display statistics in a clean and responsive manner.

- **React Hot Toasts**: Implemented for real-time notifications, providing users with instant feedback and enhancing overall interactivity.

- **Docker**: Employed Docker for containerization, simplifying deployment and ensuring consistent performance across various environments.

The feature set includes fundamental CRUD operations for data manipulation, as well as advanced functionalities such as filtering, sorting, searching, pagination, optimistic updates and account-based authentication using JWT tokens.

<!-- GETTING STARTED -->

## Getting Started

**To run the website locally, you need to clone both the frontend and backend applications:**

**Setting up the frontend**

- Open your terminal or command prompt.

- Use the following command to clone the frontend repository: git clone https://github.com/Benjam11n/Birds-of-a-Feather-frontend

- Navigate to the Project Directory.

- Install Dependencies by running the command "npm install".

- Open up the constants file in the frontend project and change the constant "BACKEND_URL" to "http://localhost:8080"

- Run the development server by running "npm run dev"

- Once the application is running, open your web browser and go to the following URL:http://localhost:5173

**Setting up the Backend**

- Open your terminal or command prompt.

- Use the following command to clone the backend repository:

- git clone https://github.com/Benjam11n/Birds-of-a-Feather-backend

- Open up the project and create a `.env` file in the root of the project.

- In the .env file, create a new environment variable "DATABASE_URL" and set it to your own PostgreSQL URL. For example: "postgres://postgres:password@db:5432/Birds-of-a-Feather"

- Run the backend application by running the following command: "go run ."

- The application will be running at the following URL:http://localhost:8080

<!-- USAGE EXAMPLES -->

## Usage

Both the frontend and backend are hosted on Digital Ocean. You can access the frontend using the following link:

[**Birds of a Feather Frontend**](https://birds-of-a-feather-c5xki.ondigitalocean.app)

1. **Logging in and Signing up:**

   <img src="./public/login_page.png" alt="Logo" height="360">

   - Upon entering the application, you'll be redirected to the login page.
   - Use the default login details (email: demo@example.com, password: demopassword) or sign up by clicking on the sign up tab.

2. **Joining a Community:**

   - Navigate to the communities page via the left sidebar.
   - Click on a community to visit its homepage.
   - Join a community by clicking the "Join" button in the community header.

3. **Creating a Post:**

   <img src="./public/community_homepage.png" alt="Logo" height="360">

   - Join a community first (if not done already).
   - Click "Create Post" in the community header.
   - Fill in the required information to create a post.

4. **Creating a Community:**

   <img src="./public/community_list.png" alt="Logo" height="360">

   - Access the communities page via the left sidebar.
   - Click "Create Community" on the right side of the application.

5. **Replying:**

   - Click on a post you want to reply to to be redirected to the post.
   - Find the "Reply" button at the bottom right of the post card.
   - Click to reply to a post.

6. **Upvote/Downvote:**

   - Use the upvote/downvote buttons at the bottom right of each post/ reply card.

7. **Following and Unfollowing:**

   <img src="./public/friends_page.png" alt="Logo" height="360">

   - Navigate to the Friends page via the left sidebar.
   - Manage followers on the left and potential followers on the right.
   - Click "Follow" or "Unfollow" accordingly.

8. **Update Account Details:**

   - Click on the user icon (top right) to visit the user homepage.
   - Use the "Update Account" button in the user header.

9. **Miscellaneous:**
   - Toggle dark mode/light mode using the middle button on the top right.
   - Filter/sort the posts by using the Filter and sort buttons on the top right of the application just below the header.
   - Search for posts using the search bar on the top of the application.
   - Sign out using the sign out button on the top right of the application.
   - Click on account statistics on the top right of the account homepage to see your account statistics.

<!-- CONTACT -->

## Contact

**Telegram**: @benjaminwjy

**Email**: ben.wang9000@gmail.com

Frontend Source Code: [github.com](https://github.com/Benjam11n/Birds-of-a-Feather-frontend)

Backend Source Code: [github.com](https://github.com/Benjam11n/Birds-of-a-Feather-backend)

Website link: [**Birds of a Feather Frontend**](https://birds-of-a-feather-c5xki.ondigitalocean.app)

Docker Image Link: [**Docker hub**](https://hub.docker.com/repository/docker/benjamiiin/birds-of-a-feather-frontend)

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

These are some of the awesome resources I used to build this application. Feel free to check them out!

- [React Icons](https://react-icons.github.io/react-icons/search)
- [Vite](https://github.com/vitejs/vite)
- [React Query](https://tanstack.com/query/v3/)
- [React Router](https://github.com/remix-run/react-router)
- [shadcn-ui](https://github.com/shadcn-ui/ui)
- [react-hot-toast](https://react-hot-toast.com/)
- [Recharts](https://recharts.org/en-US/)
- [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
