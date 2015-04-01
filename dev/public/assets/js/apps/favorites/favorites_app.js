define(["app"], function(PhoneBookManager){
    var favoritesAppRouter = Marionette.AppRouter.extend({
        appRoutes:{
            "favorites(/)": "listFavorites"
        }
    });

    var API = {
        listFavorites: function(){
            require(["apps/favorites/list/list_controller","common/footer_controller"], function(listController, footerController){
                listController.listFavorites();
                if (footerController.setActive){
                    footerController.setActive("favorites");
                }

            });
        }
    };

    PhoneBookManager.on("favorites:list", function(){
        Backbone.history.navigate("favorites");
        API.listFavorites();
    });



    PhoneBookManager.addInitializer(function(){
        new favoritesAppRouter({
            controller: API
        })
    });
});