const { ChatModel } = require( '../model' );

const getChatByID = async ( chat ) => {

    try {

        var response;
        console.log( `Checking Chat( ${ chat } ) exists?` );
        const chatData = await ChatModel.findById( { _id: chat } );

        if ( !chatData ) {

            console.error( `Chat( ${chat} ) doesn't exists. Cannot fetch this chat as we have no records of it.` );
            return;
        
        }
        console.log( `Chat( ${ chat } ) exists` );

        return response;
        
    } catch ( error ) {
        
        throw error;

    }
    
}

const getAllChat = async () => {

    try {

        console.log( `Fetching all chats` );
        const chatsData = await ChatModel.find();
        
        if ( !chatsData ) {

            console.error( `No chats exists` );
            return;

        }
        console.log( `Fetched all chats` );

        return chatsData;
        
    } catch ( error ) {
        
        throw error;

    }
}

module.exports = {

    getChatByID,
    getAllChat

};