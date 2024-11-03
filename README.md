"# VOTING-APP" 

Key Features:

User Authentication and Security:

  Secure signup and login using JWT-based authentication to manage user sessions and prevent repeated logins.
  Passwords are hashed using bcrypt to ensure secure storage and protection against data breaches.

Profile Management:

  Users can view, update, and manage their profile and change their password as needed.

Voting System:

  Registered users can cast a vote for any candidate using the endpoint /vote/:candidateid.
  Users can view a list of all available candidates for voting via /candidates.
  A live count of votes for each candidate is available at /vote/count, providing real-time voting insights.

Admin Role:

  Admin users have access to create, edit, and delete candidate profiles, ensuring complete control over the voting candidates.
  Admins are restricted from voting, ensuring impartial management of voting options.

Tech Stack:
  Backend Framework: Node.js with Express.js
  Database: MongoDB for flexible and efficient data storage
  Authentication & Security: JWT for secure, token-based sessions; bcrypt for password hashing
  Middleware: body-parser for parsing incoming requests in JSON format

Testing and Interface:
  The app is thoroughly tested and managed via Postman to demonstrate all endpoints and functionalities.

Note: This application focuses on delivering a robust backend infrastructure for a voting system, ideal for integration with a frontend client or further expansion
