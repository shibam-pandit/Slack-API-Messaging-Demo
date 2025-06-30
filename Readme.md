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
   - Create a public channel (e.g., `#test-channel`) where messages will be posted.

2. **Create a Slack App**:
   - Go to [api.slack.com/apps](https://api.slack.com/apps) and create a new app.
   - Add bot token scopes: `channels:read`, `chat:write`, `chat:write.public`, `channels:history`.
   - Install the app to your workspace and copy the Bot User OAuth Token.
   - Invite the bot to your channel using `/invite @InternshipBot`.

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
   - Test endpoints using the included Postman collection (see Testing section) or any REST client.

## Testing
- All operations were tested in a free Slack workspace to ensure no impact on real users.
- Using a workspace provides a realistic environment with full API support while being easily accessible for demonstration purposes.
- **[Postman Collection]**: Import the included [`postman_collection.json`](./Slack%20Api%20Messaging%20demo.postman_collection.json) file into Postman to quickly test all endpoints with pre-configured requests.

## API Endpoints

| Endpoint | Method | Request Body / Parameters | Description |
|----------|--------|---------------------------|-------------|
| `/send-message` | POST | `{"text": "Your message"}` | Send an immediate message to the channel |
| `/schedule-message` | POST | `{"delay": seconds, "text": "Your message"}` | Schedule a message for future delivery |
| `/retrieve-messages` | GET | N/A | Returns the last 10 messages from the channel |
| `/edit-message` | PUT | `{"ts": "timestamp", "updatedText": "New content"}` | Edit an existing message |
| `/delete-message` | DELETE | Query: `ts=timestamp` | Delete a message by its timestamp |

## Resources
- [Slack API Docs](https://api.slack.com/apis)
- [Messaging Guide](https://api.slack.com/messaging)

## Notes
- Token-based authentication is used for simplicity and aligns with the assignment's requirements.
- The free Slack workspace provides an ideal environment for demonstrating these messaging operations with full API support.