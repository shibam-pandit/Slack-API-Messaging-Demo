require('dotenv').config();
const { WebClient } = require('@slack/web-api');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Initialize Slack WebClient with bot token
const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);

// Helper function to get channel ID by name
async function getChannelId(channelName) {
  try {
    const result = await slackClient.conversations.list({
      types: 'public_channel',
    });
    const channel = result.channels.find((ch) => ch.name === channelName);
    return channel ? channel.id : null;
  } catch (error) {
    console.error('Error fetching channel ID:', error);
    return null;
  }
}

// Send a message
app.post('/send-message', async (req, res) => {
  try {
    const channelId = await getChannelId('test-channel');
    if (!channelId) return res.status(404).send('Channel not found');

    const { text } = req.body;
    if (!text) return res.status(400).send('Text is required');

    const result = await slackClient.chat.postMessage({
      channel: channelId,
      text: text
    });
    res.send(`Message sent with timestamp: ${result.ts}`);
  } catch (error) {
    res.status(500).send('Error sending message: ' + error.message);
  }
});

// Schedule a message with a delay time and then send it
app.post('/schedule-message', async (req, res) => {
  try {
    const channelId = await getChannelId('test-channel');
    if (!channelId) return res.status(404).send('Channel not found');

    const { delay, text } = req.body;  // Delay in seconds
    if (!delay || !text) return res.status(400).send('Delay and text are required');
    if (typeof delay !== 'number' || delay <= 0) {
      return res.status(400).send('Delay must be a positive number');
    }

    const postAt = Math.floor(Date.now() / 1000) + delay; // 5 minutes from now
    const result = await slackClient.chat.scheduleMessage({
      channel: channelId,
      text: text,
      post_at: postAt,
    });
    res.send(`Message scheduled with ID: ${result.scheduled_message_id}`);
  } catch (error) {
    res.status(500).send('Error scheduling message: ' + error.message);
  }
});

// Retrieve messages
app.get('/retrieve-messages', async (req, res) => {
  try {
    const channelId = await getChannelId('test-channel');
    if (!channelId) return res.status(404).send('Channel not found');

    const result = await slackClient.conversations.history({
      channel: channelId,
      limit: 10,
    });
    res.json(result.messages);
  } catch (error) {
    res.status(500).send('Error retrieving messages: ' + error.message);
  }
});

// Edit a message
app.put('/edit-message', async (req, res) => {
  try {
    const channelId = await getChannelId('test-channel');
    if (!channelId) return res.status(404).send('Channel not found');

    const { ts, updatedText } = req.body;
    if (!ts) return res.status(400).send('Timestamp required');

    const result = await slackClient.chat.update({
      channel: channelId,
      ts,
      text: updatedText,
    });
    res.send(`Message updated with timestamp: ${result.ts}`);
  } catch (error) {
    res.status(500).send('Error editing message: ' + error.message);
  }
});

// Delete a message
app.delete('/delete-message', async (req, res) => {
  try {
    const channelId = await getChannelId('test-channel');
    if (!channelId) return res.status(404).send('Channel not found');

    const { ts } = req.query; // Pass timestamp
    if (!ts) return res.status(400).send('Timestamp required');

    await slackClient.chat.delete({
      channel: channelId,
      ts,
    });
    res.send(`Message deleted with timestamp: ${ts}`);
  } catch (error) {
    res.status(500).send('Error deleting message: ' + error.message);
  }
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));