const express = require('express')
require('dotenv').config();
const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');
const app = express()

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})

  // Build Snoowrap and Snoostorm clients
const r = new Snoowrap({
    userAgent: 'reddit-bot-example-node',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
});
const client = new Snoostorm(r);

// Configure options for stream: subreddit & results per query
const streamOpts = {
    subreddit: 'subredditdrama',
    results: 25
};

// Create a Snoostorm CommentStream with the specified options
const comments = client.CommentStream(streamOpts); // eslint-disable-line

// On comment, perform whatever logic you want to do
comments.on('comment', (comment) => {
    console.log(comment.body.search(/dashain/i));
    if (comment.body.search(/dashain/i) != -1 ) {
        comment.reply('demo bot for da$hain :)');
    }
    else{
        console.log(comment.body);
    }
});
