define(["app","common/footer_view"], function(PhoneBookManager, footerView){
    return {
        showFooter: function(){
            this.footer = new footerView();
            PhoneBookManager.footerRegion.show(this.footer);
            this.setActive=function(link){
                this.footer.triggerMethod("setActive",link)
            }
        }
    }
});