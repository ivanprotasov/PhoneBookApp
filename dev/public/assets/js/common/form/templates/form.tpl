<div class="panel-heading clearfix">
    <h2 class="pull-left"><%- action %> contact</h2><button type="button" class="close"><span>&times;</span></button>
</div>
<div class="panel-body">
    <form class="form-horizontal">
        <div class="form-group has-feedback">
            <div>
                <label class="col-md-3 control-label" for="firstName">First name</label>
                <div class="col-md-9">
                    <input class="form-control" id="firstName" name="firstName" placeholder="Enter first name" value="<%- firstName %>">
                    <span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
                </div>
            </div>
            <div>
                <div class="col-md-9 col-md-offset-3">
                   <span class="pb-error text-danger"></span>
                </div>
            </div>
        </div>
        <div class="form-group has-feedback">
            <div>
                <label class="col-md-3 control-label" for="lastName">Last name<span class="text-danger">*</span></label>
                <div class="col-md-9">
                    <input class="form-control" id="lastName" name="lastName" placeholder="Enter last name" value="<%- lastName %>">
                    <span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
                </div>
            </div>
            <div>
                <div class="col-md-9 col-md-offset-3">
                    <span class="pb-error text-danger"></span>
                </div>
            </div>

        </div>
        <div class="form-group has-feedback">
            <div>
                <label class="col-md-3 control-label" for="mobilePhone">Mobile phone<span class="text-danger">*</span></label>
                <div class="col-md-9">
                    <input class="form-control" id="mobilePhone" name="mobilePhone" placeholder="Enter mobile phone" value="<%- mobilePhone %>">
                    <span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
                </div>
            </div>
            <div>
                <div class="col-md-9 col-md-offset-3">
                    <span class="pb-error text-danger"></span>
                </div>
            </div>
        </div>
        <div class="form-group has-feedback">
            <div>
                <label class="col-md-3 control-label" for="homePhone">Home phone</label>
                <div class="col-md-9">
                    <input class="form-control" id="homePhone" name="homePhone" placeholder="Enter home phone" value="<%- homePhone %>">
                    <span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
                </div>
            </div>
            <div>
                <div class="col-md-9 col-md-offset-3">
                    <span class="pb-error text-danger"></span>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="pb-favorite-checkbox">
                <label class="col-md-3 control-label" for="favorite">Favorite</label>
                <div class="col-md-9">
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" id="favorite" name="favorite" <% if (typeof(favorite)!=="undefined"&&favorite){ %>checked<% }%>>
                            <span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <button type="submit" class="btn btn-default pull-right pb-submit">Submit</button>
    </form>
</div>