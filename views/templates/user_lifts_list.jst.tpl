<%
userLifts.forEach(function(userLift) {
%>
<div class="weight">
	<%= userLift.getWeight() %>lb
	<span class="reps">
		(<%= userLift.getRepetitions() %> Rep<% if (userLift.getRepetitions() != 1) { print('s'); } %>)
	</span>
</div>
<div class="date">
  <%= $.datepicker.formatDate('M d, yy', new Date(userLift.getDate() * 1000)) %>
</div> 
<%
});
%>

