define(["jquery", "backbone", "app"],function($, Backbone, PhoneBookManager){
    return Backbone.Model.extend({
        defaults: {
            favorite: false,
            firstName: "",
            lastName: "",
            mobilePhone: "",
            homePhone: ""
        },
        idAttribute: "_id"
    });

});