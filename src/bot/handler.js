const { Service: { TradeService } } = require( '../../lib' );
const { validationResult } = require( 'express-validator' );

const fetchChatByID = async ( req, res ) => {

  const errors = validationResult( req );

  if ( !errors.isEmpty() ) {
        
    return res.status( 400 ).json( { errors: errors.array() } );
        
  }

  try {

    const chatId = req.params.id;

    console.log( `GET /messages/:id => Fetching trade( ${chatId} )` );
    const chatTrade = await ChatService.getChatByID( chatId );

    if (!chatTrade) {

      console.error( `GET /messages/:id => Some error occured while fetching chat( ${chatId} )` );
      return res.status( 422 ).json( { message: 'Unable to fetch the trade' } );
    
    }
    console.log( `GET /messages/:id => Fetched trade( ${chatId} )` );
    
    return res.status( 200 ).json( { data: chatTrade } );
  
  } catch ( err ) {

    console.error( 'GET /messages/:id =>', err.message );
    return res.status( 500 );

  }
};

const fetchAllMessages = async ( req, res ) => {
  
  try {

    console.log( `GET /messages => Fetching Messages` );
    const messagesData = await ChatService.getAllChat();
    console.log( `GET /messages => Fetched Messages` );

    if ( !messagesData ) {

      console.error( `GET /messages => Some error occured while fetching messages` );
      return res.status( 422 ).json( { message: 'Unable to fetch messages' } );

    }

    return res.status( 200 ).json( { data: messagesData } );
    
  } catch ( err ) {

    console.error( 'GET /messages =>', err.message );
    return res.status( 500 );

  }
}

module.exports = {

    fetchAllMessages,
    fetchChatByID

}