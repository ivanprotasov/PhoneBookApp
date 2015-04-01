define(["app","tpl!common/form/templates/form.tpl","backbone.syphon"],function(PhoneBookManager, formTpl){
    return Marionette.ItemView.extend({
        className:"panel panel-default pb-100",
        template:formTpl,

        events: {
            "click .pb-submit": "formSubmit"

        },

        triggers: {
            "click .close": "close:view"
        },

        formSubmit: function(e){
            e.preventDefault();
            var data=Backbone.Syphon.serialize(this);
            this.trigger("form:submit", data);
        },

        onFormDataInvalid: function(errors){
            var $form=this.$el;
            $form.find(".pb-error").empty();
            $form.find(".has-error").removeClass("has-error");

            var setErrors = function(error,key){
                $formGroup = $form.find("#"+key).closest(".form-group");
                $formGroup.addClass("has-error");
                $formGroup.find(".pb-error").html(error);
            };

            var $formGroup;

            if (!_.has(errors, "path")){ //проверка по значению
                _.each(errors,setErrors);
            }else{
                setErrors(errors.message,errors.path);
            }

        }
    });
});