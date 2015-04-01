define(["app", "common/form/form_view","backbone.syphon"],function(PhoneBookManager, formView){
    return formView.extend({
        serializeData:function(){
            return _.extend(this.model.toJSON(), {action : "Edit"});
        }
    });
});