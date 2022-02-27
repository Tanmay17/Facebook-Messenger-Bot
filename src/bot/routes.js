const express = require( 'express' );
const { Validator } = require( '../../lib/plugin' );
const { fetchAllMessages, fetchChatByID } = require( './handler' );

const router = express.Router();

/** To Fetch all the messages */
router.get( '/messages', fetchAllMessages );

/** To Fetch chat by ID */
router.get( '/messages/:id', Validator.validate( 'getChatsByID' ), fetchChatByID );

module.exports = router;