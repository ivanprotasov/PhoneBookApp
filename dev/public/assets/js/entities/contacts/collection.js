define(["app","entities/contacts/model"], function(PhoneBookManager,ContactModel){
    var ContactCollection = Backbone.Collection.extend({
        url: "contacts",
        model: ContactModel,
        comparator: "lastName"
    });

    var API = {
        getContactEntities: function(){
            var contacts = new ContactCollection();
            var defer = $.Deferred();
            contacts.fetch({
                success:function(models){
                    defer.resolve(models)
                },
                error:function(models){
                    defer.reject(models)
                }
            });
//            options || (options = {});
//            defer.then(options.success, options.error);
//            var response = contacts.fetch(_.omit(options, 'success', 'error'));
//            response.done(function(){
//                defer.resolveWith(response, [contacts]);
//            });
//            response.fail(function(){
//                defer.rejectWith(arguments, arguments);
//            });

            return defer.promise(contacts);
        }
    };

    PhoneBookManager.reqres.setHandler("contact:entities", function(){
        return API.getContactEntities();
    });


    return ContactCollection;
});