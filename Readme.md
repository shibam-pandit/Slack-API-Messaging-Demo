# Slack Internship Assignment

## Overview
This project implements Slack API messaging functionalities in a free Slack workspace. It uses token-based authentication and supports the following operations in a `#test-channel`:
- Send a message to a Slack channel.
- Schedule a message for future delivery.
- Retrieve messages from a channel.
- Edit an existing message.
- Delete a message.

## Setup Instructions
1. **Create a Free Slack Workspace**:
   - Sign up at [slack.com](https://slack.com) with a new email.
   - Create a public channel named `#test-channel`.

2. **Create a Slack App**:
   - Go to [api.slack.com/apps](https://api.slack.com/apps) and create a new app.
   - Add bot token scopes: `channels:read`, `chat:write`, `chat:write.public`, `channels:history`.
   - Install the app to your workspace and copy the Bot User OAuth Token.
   - Invite the bot to `#test-channel` using `/invite @InternshipBot`.

3. **Set Up Environment**:
   - Install Node.js and npm.
   - Clone this repository and run:
     ```bash
     npm install
     ```
   - Create a `.env` file with:
     ```env
     SLACK_BOT_TOKEN=xoxb-your-bot-token
     ```

4. **Run the Application**:
   - Start the server:
     ```bash
     node app.js
     ```
   - Test endpoints using a REST client like Postman:
     - Send: `POST http://localhost:3000/send-message` with JSON body `{"text": "Hello world"}`
     - Schedule: `POST http://localhost:3000/schedule-message` with JSON body `{"delay": 300, "text": "Scheduled message"}`
     - Retrieve: `GET http://localhost:3000/retrieve-messages`
     - Edit: `PUT http://localhost:3000/edit-message` with JSON body `{"ts": "timestamp", "updatedText": "Updated text"}`
     - Delete: `DELETE http://localhost:3000/delete-message?ts=timestamp`

## Testing
- All operations were tested in a free Slack workspace's `#test-channel` to ensure no impact on real users.
- Using a workspace for this implementation provides a realistic testing environment with all the required API functionalities while being easily accessible and configurable for demonstration purposes.

## API Endpoints
1. **Send Message**: `POST /send-message`
   - Request Body: `{"text": "Your message"}`

2. **Schedule Message**: `POST /schedule-message`
   - Request Body: `{"delay": seconds, "text": "Your scheduled message"}`
   - Delay is specified in seconds from current time

3. **Retrieve Messages**: `GET /retrieve-messages`
   - Returns the last 10 messages in the channel

4. **Edit Message**: `PUT /edit-message`
   - Request Body: `{"ts": "timestamp", "updatedText": "New message content"}`

5. **Delete Message**: `DELETE /delete-message?ts=timestamp`
   - Query Parameter: `ts` - timestamp of message to delete

## Resources
- [Slack API Docs](https://api.slack.com/apis)
- [Messaging Guide](https://api.slack.com/messaging)

## Notes
- The implementation uses token-based authentication for simplicity, as allowed by the assignment.
- The free Slack workspace provides an ideal environment for demonstrating these messaging operations with full API support.