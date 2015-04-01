define(["app", "apps/favorites/list/list_view"], function(PhoneBookManager, List){
    return {
        listFavorites: function(){
            require(["entities/favorites/collection","common/form/form_controller"],function(entities,FormController){
                var fetchingFavorites = PhoneBookManager.request("favorite:entities");
                $.when(fetchingFavorites).done(function(contacts){
                    var favoriteList = new List.Contacts({
                        collection:contacts
                    });


                    favoriteList.on("childview:contact:edit", function(childView){
                        var savingModel=FormController.edit(childView.model.get("_id"));
                        $.when(savingModel).done(function(model){
                            console.log(model.get("favorite"));
                            if (!model.get("favorite")){
                                contacts.remove(childView.model);
                            }
                            console.log(childView);
                            if(!childView.isDestroyed){
                                childView.model.set(model.toJSON());
                                childView.render();
                            }
                        });
                    });

                    favoriteList.on("childview:contact:delete", function(childView){
                        childView.model.destroy();
                    });

                    favoriteList.on("childview:contact:favorite", function(childView,data){
                        childView.model.save({"favorite":data});
                        contacts.remove(childView.model);
                    });

                    PhoneBookManager.mainRegion.show(favoriteList);
                }).fail(function(){
                        console.log(arguments);
                });
            })
        }
    }
});