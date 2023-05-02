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

4. I have implemented a unit test specifically for the Home component.
