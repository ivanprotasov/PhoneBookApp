define(["app",
        "tpl!apps/contacts/list/templates/layout.tpl",
        "tpl!apps/contacts/list/templates/panel.tpl",
        "tpl!apps/contacts/list/templates/empty.tpl",
        "tpl!apps/contacts/list/templates/contact.tpl",
        "tpl!apps/contacts/list/templates/contacts.tpl",
        "tooltip"],
    function(PhoneBookManager, layoutTpl, panelTpl, emptyTpl, contactTpl, contactsTpl, tooltip){
        var List = {};
        List.Layout=Marionette.LayoutView.extend({
            template:layoutTpl,
            className:"pb-100",
            regions:{
                panelRegion: "#panel-region",
                contactsRegion: "#contacts-region"
            }
        });

        List.Panel=Marionette.ItemView.extend({
            template:panelTpl,
            tagName: "nav",
            className:"navbar navbar-default",
            triggers: {
                "click .pb-btn-add":"contacts:new"
            },
            events: {
                "click .pb-btn-filter":"filter"
            },
            ui: {
                criterion: ".pb-input-filter"
            },
            filter: function(e){
                e.preventDefault();
                var data=this.ui.criterion.val();
                this.trigger("contacts:filter", data);
            },
            onSetCriterion: function(criterion){
                this.ui.criterion.val(criterion);
            }
        });

        List.Contact=Marionette.ItemView.extend({
            tagName: "tr",
            template: contactTpl,
            onRender: function(){
                this.tooltip = this.$el.find('.pb-tooltip').tooltip({
                    container: 'body'
                });
            },
            onBeforeDestroy: function(){
                if(this.tooltip){
                    this.$el.find('.pb-tooltip').each(function(){
                        $(this).tooltip('destroy');
                    })
                }
                $('body').children('.tooltip').remove(); //tooltip('destroy') не чистит, потому ручками почистил
            },
            triggers:{
                "click .pb-btn-delete": "contact:delete",
                "click .pb-btn-edit": "contact:edit"
            },
            events: {
                "click .glyphicon-star-empty": "toggleFavorite"
            },
            toggleFavorite: function(e){
                this.trigger("contact:favorite", !$(e.target).prev().prop("checked"));

            }
        });

        List.EmptyView=Marionette.ItemView.extend({
            template: emptyTpl,
            tagName: "h3"
        });

        List.Contacts=Marionette.CompositeView.extend({
            template: contactsTpl,
            className: "panel panel-default pb-contacts-panel",
            emptyView: List.EmptyView,
            childView: List.Contact,
            childViewContainer: "table",
            events: {
                "click .pb-btn-edit-contacts":"editContacts"
            },
            ui: {
                title:"h3",
                edit:".pb-btn-edit-contacts"
            },
            onBeforeRenderEmpty: function(){
                this.ui.edit.prop("disabled", true);
                this.ui.title.html("No any contacts");
            },
            onBeforeRenderCollection: function(){
                this.ui.edit.prop("disabled", false);
            },
            onRenderCollection: function(){
                if (this.collection.filtered){
                    this.ui.title.html("Filtered contacts");
                }else{
                    this.ui.title.html("All contacts");
                }
            },
            editContacts: function(e){
                $(e.currentTarget).toggleClass("active");
                this.$el.find(".pb-all-contacts").toggleClass("pb-edit-active")
            }
        });

    return List;
});