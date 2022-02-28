const { param } = require( 'express-validator' )

exports.validate = ( method ) => {

    switch ( method ) {
        case 'getChatsByID':
            return [
                param( 'id', 'Invalid ID' ).isString().notEmpty()
            ]
    }

}