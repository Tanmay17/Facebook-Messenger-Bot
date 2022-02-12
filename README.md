## Task:

The goal is to create a Facebook Messenger bot in Node.js.

For more information on the Facebook Messenger bot, click [here](https://developers.facebook.com/docs/messenger-platform/).

### The app should:

1. Be able to run Facebook Messenger webhook.
2. When a user starts a conversation, say `Hi` and ask a few questions:
    1. User's first name
    2. User’s birthdate. To make it simpler, you can assume there's only one valid date format `YYYY-MM-DD`
    3. Ask if the user wants to know how many days till his next birthday. 
    This is a yes/no answer and the bot should accept both user text answers 
    (`"yes", "yeah", "yup", "no”, "nah"`, etc.) or quick reply buttons.
        1.  If the user says **yes** to the last question, send him a message: 
        `There are <N> days left until your next birthday`
        2. If the user says **no**, just say: `Goodbye 👋`
3. Within the same app, create a REST endpoints: 
    1. `/messages` that list all messages received from users
    2. `/messages/:id` to view single message by its ID
    3. `/summary` to view this data exact data
    
    ```json
    [
     { user: <user_id>, name: <user_name>, messages: [<list_of_users_messages>] }
     { user: <user_id>, name: <user_name>, messages: [<list_of_users_messages>] }
     ...
    ]
    ```

### RUN Project
1. Add a file with name `.env` with following data:
    ```json
       MESSENGER_PAGE_ID=
       MESSENGER_ACCESS_TOKEN=
       MESSENGER_APP_ID=
       MESSENGER_APP_SECRET=
       MESSENGER_VERIFY_TOKEN=
       MONGO_URL=mongodb://localhost:27017/bot
       PORT=3000```
    `Note`:  DB NAME will be `bot`
2. On package.json:
   1. If using Express.js:
    - "server-dev": "nodemon server.js",
    - "server-start": "node server.js",

    2. If using Bottender:
     - "bot-dev": "bottender dev",
     - "bot-start": "bottender start",

3. Run it:
    on console: $ npm run bot-dev -- --console
    on server:  $ npm run server-dev

4. Public domain & connect to webhook:
    $ ngrok.exe http 5000
    $ npx bottender messenger webhook set -w <URL_FROM_NGROK>/webhooks/messenger