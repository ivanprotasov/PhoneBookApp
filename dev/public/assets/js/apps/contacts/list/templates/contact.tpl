<td class="pb-favorite-td pb-favorite-checkbox">
    <div class="checkbox">
        <label>
            <input type="checkbox" <% if (favorite){ %>checked<% }%>>
            <span class="glyphicon glyphicon-star-empty" aria-hidden="true" ></span>
        </label>
    </div>
</td>
<td class="pb-first-name-td"><%- firstName %></td>
<td class="pb-last-name-td"><b><%- lastName %></b></td>
<td class="pb-mobile-phone-td"><%- mobilePhone %></td>
<td class="pb-home-phone-td"><%- homePhone %></td>
<td class="pb-buttons-set">
    <div class="btn-group pull-right">
        <button type="button" class="btn btn-default btn-xs pb-btn-edit pb-tooltip"  title="Edit contact">
            <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
        </button>
        <button type="button" class="btn btn-default btn-xs pb-btn-delete pb-tooltip"  title="Delete contact">
            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
        </button>
    </div>
</td>