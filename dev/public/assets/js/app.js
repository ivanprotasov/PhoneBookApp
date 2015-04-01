define(["marionette"],function(Marionette){

    var PhoneBookManager = new Marionette.Application();

    PhoneBookManager.addRegions({

        mainRegion: "#main-region",
        footerRegion: "#footer-region",
        helperRegion: Marionette.Region.extend({
            el: "#helper-region",
            onShow: function(){
                this.$el.css('position','absolute');
            },
            empty: function(){
                var self = this,
                    args = arguments,
                    originalEmpty = Marionette.Region.prototype.empty;
                this.$el.find(".panel-body").css("overflow","");
                this.$el.slideUp('fast', function(){
                    self.$el.css({
                        'position':'',
                        'display':''
                    });
                    return originalEmpty.apply(self, args);
                });
            },
            attachHtml: function(view){
                this.$el.empty().append(view.el);
                this.$el.hide().slideDown('fast',function(){
                    $(this).find(".panel-body").css("overflow","auto");
                })
            }
        })
    });

    PhoneBookManager.on("start", function(){
        if(Backbone.history){
            require(["common/footer_controller","apps/contacts/contacts_app","apps/favorites/favorites_app"], function (footerController) {
                Backbone.history.start();
                footerController.showFooter();
                if(Backbone.history.fragment === ""){
                    PhoneBookManager.trigger("contacts:list");
                }
            });

        }
    });

    return PhoneBookManager;
});