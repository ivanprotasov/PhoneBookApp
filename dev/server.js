/**
 * Created by HOME-PC on 28.02.15.
 */
// Module dependencies.
var application_root = __dirname,
    express = require( 'express' ), //Web framework
    bodyParser = require('body-parser'), //Parser for reading request body
    path = require( 'path' ), //Utilities for dealing with file paths
    mongoose = require( 'mongoose' ); //MongoDB integration

//Create server
var app = express();

////Connect to database
//var db = mongoose.connection;
//
//db.on('error', console.error);
//db.once('open', function() {
//    // Create your schemas and models here.
//});

mongoose.connect('mongodb://localhost/phoneApp1');

var db = mongoose.connection;

//Where to serve static content
app.use( express.static( path.join( application_root, 'public') ) );
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



//Schemas
var Contact = {
    favorite: Boolean,
    firstName: String,
    lastName: String,
    mobilePhone: Number,
    homePhone: Number
};

//Models
var ContactsModel = mongoose.model( 'Contact', Contact);

//Start server
var port = 5000;

app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});


app.get( '/contacts', function( request, response ) {
    return ContactsModel.find(function( err, contacts ) {
        if( !err ) {
            return response.send( contacts );
        } else {
            return console.log( err );
        }
    });
});

app.get( '/favorites', function(request, response ) {
    return ContactsModel.find({favorite:true},function( err, contacts ) {
        if( !err ) {
            return response.send( contacts );
        } else {
            return console.log( err );
        }
    });
});

app.post( '/contacts', function( request, response ) {
    var contact = new ContactsModel({
        favorite : request.body.favorite,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        mobilePhone: request.body.mobilePhone,
        homePhone: request.body.homePhone
    });

    return contact.save( function( err ) {
        if( !err ) {
            console.log( 'created' );
            return response.send( contact );
        } else {
            console.log( err );
            response.status(422);
            return response.send( err );
        }
    });
});

app.get( '/contacts/:id', function( request, response ) {
    return ContactsModel.findById( request.params.id, function( err, contact ) {
        if( !err ) {
            return response.send( contact );
        } else {
            return console.log( err );
        }
    });
});

var putFunc = function( request, response ) {
    console.log(request.params);
    return ContactsModel.findById(request.params.id, function( err, contact ) {
        contact.favorite = request.body.favorite;
        contact.firstName = request.body.firstName;
        contact.lastName = request.body.lastName;
        contact.mobilePhone = request.body.mobilePhone;
        contact.homePhone = request.body.homePhone;

        return contact.save( function( err ) {
            if( !err ) {
                console.log( 'contact updated' );
                return response.send( contact );
            } else {
                console.log( err );
            }
        });
    });
};

app.put( '/contacts/:id', putFunc);
app.put( '/favorites/:id', putFunc);

var deleteFunc = function( request, response ) {
    console.log( 'Deleting contact with id: ' + request.params.id );
    return ContactsModel.findById( request.params.id, function( err, model ) {
        return model.remove( function( err ) {
            if( !err ) {
                console.log( 'Contact removed' );
                return response.send(model);
            } else {
                console.log( err );
            }
        });
    });
};

app.delete( '/contacts/:id', deleteFunc);
app.delete( '/favorites/:id', deleteFunc);


