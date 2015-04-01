define(["app", "apps/contacts/list/list_view"], function(PhoneBookManager, List){
    return {
        listContacts: function(criterion){
            require(["entities/contacts/collection","common/form/form_controller"],function(entities,FormController){
                var fetchingContacts = PhoneBookManager.request("contact:entities");
                $.when(fetchingContacts).done(function(contacts){

                    var contactsListLayout = new List.Layout();
                    var panel = new List.Panel();

                    var filterCollection = new contacts.constructor();
                    filterCollection.add(contacts.models);


                    filterCollection.setFilter = function(criterion){
                        this.filtered=!!criterion;
                        this.filter = function(){
                            var filteredList=_.filter(contacts.models, function(model){
                                var attrs = _.omit(model.attributes, ['_id','__v']);
                                return _.some(attrs, function(value){
                                    value=(value==null?"":value)+"";
                                    return value.indexOf(criterion)>-1;
                                });
                            });
                            this.reset(filteredList);
                        };
                        this.filter();
                    };

                    filterCollection.setFilter(criterion||"");

                    panel.once("show",
                        function(){
                            panel.triggerMethod("set:criterion",criterion);
                        }
                    );

                    var contactsList = new List.Contacts({
                        collection:filterCollection
                    });

                    filterCollection.listenTo(contacts,"add",function(model){
                        filterCollection.filter();
                    });


                    panel.on("contacts:new", function(){
                            var savingModel=FormController.edit();
                            $.when(savingModel).done(function(model){
                                contacts.add(model);
                            });
                            PhoneBookManager.trigger("contacts:filter", criterion);
                    });

                    panel.on("contacts:filter", function(criterion){
                        filterCollection.setFilter(criterion);
                        PhoneBookManager.trigger("contacts:filter", criterion);
                    });
                    
                    contactsList.on("childview:contact:edit", function(childView){
                            var savingModel=FormController.edit(childView.model.get("_id"));
                            $.when(savingModel).done(function(model){
                                if(childView){
                                    childView.model.set(model.toJSON());
                                    childView.render();
                                }
                                filterCollection.filter(); //здесь можно не фильтровать всю коллекцию заново, а лишь проверить модель, и удалить въюху, если она не соответствует критерию.
                            });
                    });

                    contactsList.on("childview:contact:delete", function(childView){
                        childView.model.destroy();
                    });

                    contactsList.on("childview:contact:favorite", function(childView,data){
                        childView.model.save({"favorite":data});
                    });

                    contactsListLayout.on("show", function(){
                        contactsListLayout.panelRegion.show(panel);
                        contactsListLayout.contactsRegion.show(contactsList);
                    });

                    PhoneBookManager.mainRegion.show(contactsListLayout);

                }).fail(function(){
                    console.log(arguments);
                });
            });
        }

    }
});