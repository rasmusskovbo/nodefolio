function createProject() {
    fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            title: document.getElementById("title").value,
            category: document.getElementById("category").value,
            technologies: document.getElementById("technologies").value,
            links: document.getElementById("links").value
        })
    }).then(res => {
        if (res.status == 200) {
            console.log("Success")
            toastr.success("Project created successfully")
            setTimeout(() => location.href= "/dshbrd", 3000);
        }
        else {
            console.log("Error:", res.status)
        }
    }) 
}

function getProjects() {
    fetch("/api/projects")
    .then(response => response.json())
    .then(( projects ) => {
        const projectsWrapperDiv = document.getElementById("projects-wrapper");
        
        console.log(projects)
        projects.map(project => { 
            const tableRow = document.createElement("tr")
            tableRow.innerHTML = `
            <td>${escapeHTML(project.id)}</td>
            <td>${escapeHTML(project.title)}</td>
            <td>${escapeHTML(project.category)}</td>
            <td>${escapeHTML(project.technologies)}</td>
            <td>${escapeHTML(project.links)}</td>
            `
            projectsWrapperDiv.appendChild(tableRow);
    
        });
    });
}


// <p>Links: ${escapeHTML(project.links.join(", "))}p>
document.addEventListener("DOMContentLoaded", function() {
    getProjects()
  });
document.getElementById("create-project").addEventListener("click", createProject)