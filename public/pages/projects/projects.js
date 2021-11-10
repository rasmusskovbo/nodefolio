fetch("/api/projects")
.then(response => response.json())
.then(( projects ) => {
    const projectsWrapperDiv = document.getElementById("projects-wrapper");
    projects.map(project => { 
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project-element")
        projectDiv.innerHTML = `
            <h3>${escapeHTML(project.title)}</h3>
            <p>Category: ${escapeHTML(project.category)}</p>
            <p>Technologies: ${escapeHTML(project.technologies)}</p>
            <p>Links: ${escapeHTML(project.links)}</p>
        `;
        
        projectsWrapperDiv.appendChild(projectDiv);

    });
});

// <p>Links: ${escapeHTML(project.links.join(", "))}p>