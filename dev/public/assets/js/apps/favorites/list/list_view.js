define(["app",
    "tpl!apps/favorites/list/templates/empty.tpl",
    "tpl!apps/favorites/list/templates/contact.tpl",
    "tpl!apps/favorites/list/templates/contacts.tpl",
    "tooltip"],
    function(PhoneBookManager, emptyTpl, contactTpl, contactsTpl, tooltip){
        var List = {};

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
            className: "panel panel-default pb-favorites-panel pb-100",
            emptyView: List.EmptyView,
            childView: List.Contact,
            childViewContainer: "table",
            events: {
                "click .pb-btn-edit-contacts":"editContacts"
            },
            ui: {
                edit:".pb-btn-edit-contacts"
            },
            onBeforeRenderEmpty: function(){
                this.ui.edit.prop("disabled", true);
            },
            onBeforeRenderCollection: function(){
                this.ui.edit.prop("disabled", false);
            },
            editContacts: function(e){
                $(e.currentTarget).toggleClass("active");
                this.$el.find(".pb-all-contacts").toggleClass("pb-edit-active")
            }
        });

        return List;
    });