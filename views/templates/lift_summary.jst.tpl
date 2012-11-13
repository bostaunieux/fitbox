<div class="thumbnail">
<div class="caption">
<a href="/lift/<%= name.replace(' ', '-').toLowerCase() %>/<%= id %>"><h4 class="name"><%= name %></h4></a>
  <%
    if (user_lifts.length > 0) {

      var liftsByRep = _.groupBy(user_lifts, function(userLift) {
        return userLift.get('repetitions');
      });

      for (var rep in liftsByRep) {
        var selected = _.max(liftsByRep[rep], function(userLift) {
          return userLift.get('date');
        });

  %>
  <p class="user-lift ">
    <div class="weight">
      <%= selected.get('weight') %>lb
      <span class="reps">(<%= selected.get('repetitions') %> Rep<% if (selected.get('repetitions') != 1) { print('s'); } %>)</span>
    </div>
    <div class="date"><%= $.datepicker.formatDate('M d, yy', new Date(selected.get('date') * 1000)) %></div> 
  </p>
  <%
      }
    }
  %>
</div>
</div>
