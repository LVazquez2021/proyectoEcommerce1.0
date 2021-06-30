# Proyecto Ecommerce Website

Welcome to <%= projectName %> 👋
<% if (isProjectOnNpm) { -%> Version <% } -%> <% if (projectVersion && !isProjectOnNpm) { -%> Version <% } -%> <% if (projectPrerequisites) { -%> <% projectPrerequisites.map(({ name, value }) => { -%>  <% }) -%> <% } -%> <% if (projectDocumentationUrl) { -%> Documentation <% } -%> <% if (isGithubRepos) { -%> Maintenance <% } -%> <% if (licenseName) { -%> License: <%= licenseName %> <% } -%> <% if (authorTwitterUsername) { -%> Twitter: <%= authorTwitterUsername %> <% } -%>

<% if (projectDescription) { -%>
<%= projectDescription %> <% } -%> <% if (projectHomepage) { -%>

🏠 Homepage
<% } -%> <% if (projectDemoUrl) { -%>

✨ Demo
<% } -%> <% if (projectPrerequisites && projectPrerequisites.length) { -%>

Prerequisites
<% projectPrerequisites.map(({ name, value }) => { -%>

<%= name %> <%= value %> <% }) -%> <% } -%> <% if (installCommand) { -%>
Install
<%= installCommand %>
<% } -%> <% if (usage) { -%>

Usage
<%= usage %>
<% } -%> <% if (testCommand) { -%>

Run tests
<%= testCommand %>
<% } -%> <% if (authorName || authorTwitterUsername || authorGithubUsername) { -%>

Author
<% if (authorName) { %> 👤 <%= authorName %> <% } %> <% if (authorWebsite) { -%>

Website: <%= authorWebsite %> <% } -%> <% if (authorTwitterUsername) { -%>
Twitter: [@<%= authorTwitterUsername %>](https://twitter.com/<%= authorTwitterUsername %>) <% } -%> <% if (authorGithubUsername) { -%>
GitHub: [@<%= authorGithubUsername %>](https://github.com/<%= authorGithubUsername %>) <% } -%> <% if (authorLinkedInUsername) { -%>
LinkedIn: [@<%= authorLinkedInUsername %>](https://linkedin.com/in/<%= authorLinkedInUsername %>) <% } -%> <% } -%> <% if (issuesUrl) { -%>
🤝 Contributing
Contributions, issues and feature requests are welcome!
Feel free to check issues page. <%= contributingUrl ? You can also take a look at the [contributing guide](${contributingUrl}). : '' %> <% } -%>

Show your support
Give a ⭐️ if this project helped you! <% if (authorPatreonUsername) { -%>

 <% } -%> <% if (licenseName && licenseUrl) { -%>
📝 License
<% if (authorName && authorGithubUsername) { -%> Copyright © <%= currentYear %> [<%= authorName %>](https://github.com/<%= authorGithubUsername %>).
<% } -%> This project is <%= licenseName %> licensed. <% } -%>

<%- include('footer.md'); -%>






