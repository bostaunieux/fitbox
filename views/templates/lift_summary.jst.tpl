<div class="name"><%= name %></div> 
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
<div class="user-lift">
	<div class="weight">
		<%= selected.get('weight') %>
		<span class="reps">(<%= selected.get('repetitions') %> Rep<% if (selected.get('repetitions') != 1) { print('s'); } %>)</span>
	</div>
	<div class="date">Date: <%= $.datepicker.formatDate('M d, yy', new Date(selected.get('date') * 1000)) %></div> 
</div>
<%
		}
	}
%>
<a href="#" class="addRecord" data-workout-id="<%= id %>">Add record</a>
