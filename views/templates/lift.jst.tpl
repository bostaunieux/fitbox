<div class="name"><%= name %></div> 
<div class="description">
	<%
	 print(description.replace("\n", "<br />", "g"));
	%>
</div> 
<a href="#" class="addRecord" data-workout-id="<%= id %>">Add record</a>
