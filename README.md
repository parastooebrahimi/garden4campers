# Garden4campers

this is an application helps campers fin gardens and properties

## Installation

1. Clone the repository:
2. Install dependencies:

```
npm install
```

## Usage

1. Run the development server:

```
npm start
```

2. Open the app in your browser:

```
http://localhost:1234
```

# Run test

```
npm test
```

# Run test coverage

```
npm run test -- --coverage

```

## Some information about the application

1. There are two user roles available, normal users and admin users.

2. Admin users have access to additional features such as adding, deleting, and editing properties. To test these sections, please login using an admin user's credentials. You can find a list of users in the user.ts file. Once you have selected a user, simply login using their credentials.

3. Users who have not logged into the application can view written comments, but in order to leave a comment, they will need to login to access the comment input field.

4. I have implemented a unit test specifically for the Home component with the time I had.

5. I used the antd library for UI development because it is fast and easy to use, especially given the limited time I had.

6. I developed two custom components to demonstrate my comfort and flexibility in developing UI components, rather than relying solely on third-party components.

7. All type declarations can be found under the model folder.

8. All routes related to the application are stored in the routes folder.

9. All views can be found under the view folder.

10. All customized hooks and functions are located in the utils folder.

11. Running Storybook can provide a better understanding of customized UI components, although it was beyond my time constraints for this challenge.

12. Thank you for reviewing my application.

## Questions you have asked

1.  How would you go about managing React components within a team?

To manage React components within a team, use a consistent file structure, a component library, version control, code reviews, automated testing, and documentation. This ensures organization, consistency, and scalability of the codebase for better collaboration and high-quality applications.

2. Pick one major technical challenge you've had in the past and explain how you overcame

One specific technical challenge I faced was optimizing the performance of a data-intensive web application. To overcome this, I used techniques such as code optimization, caching, and load balancing to reduce server load, improve response times, and provide a better user experience.
