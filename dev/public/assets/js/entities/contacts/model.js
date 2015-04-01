define(["jquery", "backbone", "app"],function($, Backbone, PhoneBookManager){
    var Contact = Backbone.Model.extend({
        urlRoot: "contacts",
        url: function(){
            var urlEnd = this.get("_id")? "/" + this.get("_id"):"";
            return this.urlRoot + urlEnd;
        },

        defaults: {
            favorite: false,
            firstName: "",
            lastName: "",
            mobilePhone: "",
            homePhone: ""
        },
        idAttribute: "_id",

        validate: function(attrs){
            var errors ={};
            if (!attrs.lastName){
                errors.lastName="You forgot last name!"
            }

            if (!attrs.mobilePhone||attrs.mobilePhone.length<7){
                errors.mobilePhone="Mobile number is invalid or less then 7 digits"
            }
            if (attrs.homePhone&&attrs.homePhone.length<7){
                errors.homePhone="Home number is invalid or less then 7 digits"
            }
            if (!_.isEmpty(errors)){
                return errors;
            }
        }
    });

    var API = {

        getContactEntity: function(contactId){
            var contact = new Contact({_id:contactId});
            var defer = $.Deferred();
            contact.fetch({
                success:function(model){
                    defer.resolve(model)
                },
                error:function(model){
                    defer.reject(model)
                }
            });
//            defer.then(options.success, options.error);
//            var response = contact.fetch(_.omit(options, 'success', 'error'));
//            response.done(function(){
//                defer.resolveWith(response, [contact]);
//            });
//            response.fail(function(){
//                defer.rejectWith(arguments, arguments);
//            });
            return defer.promise();
        }
    };

    PhoneBookManager.reqres.setHandler("contact:entity:new", function(){
        return new Contact;
    });

    PhoneBookManager.reqres.setHandler("contact:entity", function(id){
        return API.getContactEntity(id);
    });

    return Contact
});