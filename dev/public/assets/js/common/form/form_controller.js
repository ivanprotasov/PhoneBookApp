define(["app", "apps/contacts/new/new_view","apps/contacts/edit/edit_view" ], function(PhoneBookManager, NewContactView, EditContactView){
    return {
        edit: function(id){
            var defer = $.Deferred();
            var startRoute = Backbone.history.fragment;
            require(['entities/contacts/model'],function(){
                var contact;
                var contactView;

                if (!id){
                    contact = PhoneBookManager.request("contact:entity:new");
                    contactView = new NewContactView({
                        model:contact
                    });
                    Backbone.history.navigate("contacts/new");
                }else{
                    contact = PhoneBookManager.request("contact:entity",id);
                    Backbone.history.navigate("contacts/edit:"+id);
                }

                $.when(contact).done(function(contact){
                    if (!contactView){
                        contactView = new EditContactView({
                            model:contact
                        });
                    }


                contactView.on("form:submit",function(data){
                    var contactSaved = contact.save(data,{
                        success: function(){
                            defer.resolve(contact);
                            PhoneBookManager.helperRegion.empty(contactView);
                            if(!PhoneBookManager.mainRegion.hasView()){
                                PhoneBookManager.trigger("contacts:list");
                            }else{
                                Backbone.history.navigate(startRoute);
                            }
                        },
                        error: function(model, response){
                            if(response.status === 422){
                                console.log(response);
                                contactView.triggerMethod("form:data:invalid", response.responseJSON);
                            }
                            else{
                                alert("An unprocessed error happened. Please try again!");
                            }
                        }
                    });

                    if (!contactSaved){
                        contactView.triggerMethod("form:data:invalid", contact.validationError);
                    }

                });
                contactView.on("close:view",function(){
                    PhoneBookManager.helperRegion.empty(contactView);
                    if(!PhoneBookManager.mainRegion.hasView()){
                        PhoneBookManager.trigger("contacts:list");
                    }else{
                        Backbone.history.navigate(startRoute);
                    }

                });
                PhoneBookManager.helperRegion.show(contactView);

                });


            });
            return defer.promise()
        }
    }
});