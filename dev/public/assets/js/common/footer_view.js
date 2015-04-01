define(["app", "tpl!common/footer.tpl"],function(PhoneBookManager, footerTpl){
    return  Marionette.ItemView.extend({
        template:footerTpl,
        tagName:"ul",
        className:"nav nav-pills nav-justified",
        events: {
            "click a": "showList"
        },
        showList :function(e){
            e.preventDefault();
            this.$el.find("li").removeClass("active");
            var $target = $(e.target);
            $target.parent().addClass("active");
            var link=$target.attr("data-target");
            PhoneBookManager.trigger(link+":list");
            PhoneBookManager.helperRegion.empty();
        },
        onSetActive: function(link){
            this.$el.find("li").removeClass("active");
            this.$el.find("a[data-target='"+link+"']").parent().addClass("active")
        }
    })
});