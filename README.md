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