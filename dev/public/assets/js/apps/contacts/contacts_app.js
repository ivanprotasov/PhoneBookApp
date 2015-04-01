define(["app","common/footer_controller"], function(PhoneBookManager,footerController){
    var contactsAppRouter = Marionette.AppRouter.extend({
        appRoutes:{
            "contacts(/)(filter::criterion)": "listContacts",
            "contacts/new": "editContact",
            "contacts/edit::id": "editContact"
        }
    });

    var API = {
        listContacts: function(criterion){
            require(["apps/contacts/list/list_controller","common/footer_controller"], function(listController){
                listController.listContacts(criterion);
                if (footerController.setActive){
                    footerController.setActive("contacts");
                }
            });
        },
        editContact: function(id){
            require(["common/form/form_controller"], function(formController){
                formController.edit(id);
                if (footerController.setActive){
                    footerController.setActive("contacts");
                }
            });
        }
    };

    PhoneBookManager.on("contacts:list", function(){
        Backbone.history.navigate("contacts");
        API.listContacts();
    });

    PhoneBookManager.on("contacts:filter", function(criterion){
        if (criterion){
            Backbone.history.navigate("contacts/filter:"+criterion);
        }else{
            Backbone.history.navigate("contacts");
        }
    });

    PhoneBookManager.addInitializer(function(){
        new contactsAppRouter({
            controller: API
        })
    });
});