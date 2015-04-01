define(["app","entities/favorites/model"], function(PhoneBookManager,FavoriteModel){
    var FavoriteCollection = Backbone.Collection.extend({
        url: "favorites",
        model: FavoriteModel,
        comparator: "lastName"
    });

    var API = {
        getFavoriteEntities: function(){
            var favorites = new FavoriteCollection();
            var defer = $.Deferred();
            favorites.fetch({
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

            return defer.promise(favorites);
        }
    };

    PhoneBookManager.reqres.setHandler("favorite:entities", function(){
        return API.getFavoriteEntities();
    });


    return FavoriteCollection;
});