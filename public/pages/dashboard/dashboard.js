fetch("/api/projects")
.then(response => response.json())
.then(( projects ) => {
    const projectsTable = document.getElementById("projects-wrapper");

    projects.map((project, index) => { 
        var row = projectsTable.insertRow(index + 1)
        row.insertCell(0).innerHTML = project.id
        row.insertCell(1).innerHTML = `<input id="title" type="text" placeholder="Title..." value="${escapeHTML(project.title)}" required></td>`
        row.insertCell(2).innerHTML = `<input id="category" type="text" placeholder="Category..." value="${escapeHTML(project.category)}" required></td>`
        row.insertCell(3).innerHTML = `<input id="technologies" type="text" placeholder="Technologies..." value="${escapeHTML(project.technologies)}" required></td>`
        row.insertCell(4).innerHTML = `<input id="links" type="text" placeholder="Links..." value="${escapeHTML(project.links)}" required></td>`
        row.insertCell(5).innerHTML = `
            <button id="delete" class="fas-btn" style="background-color: #20202000">
            <i class="fas fa-trash-alt">
            </i></button>
        `
        row.insertCell(6).innerHTML = `
            <button id="update" class="fas-btn" style="background-color: #20202000">
            <i class="fas fa-save"></i>
            </i></button>
        `

        

        row.cells[5].onclick = function() {
            const projectId = row.cells[0].innerHTML
            deleteProject(projectId, row.rowIndex)
        }

        row.cells[6].onclick = function() {
            updateProject(row)
        }
        
    });
});

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
            toastr.success("Project created successfully")
            setTimeout(() => location.href= "/dshbrd", 1500);
        }
        else {
            console.log("Error:", res.status)
        }
    }) 
}

function deleteProject(projectId, rowToDeleteIndex) {
    fetch("/api/projects/" + projectId, {
        method: "DELETE"
    }).then(res => {
        if (res.status == 200) {
            const tableRows = document.getElementsByTagName("tr")
            const rowToDelete = Array.from(tableRows).find(row => row.rowIndex == rowToDeleteIndex)
            rowToDelete.remove()
            toastr.success(`Project with ID: ${projectId} deleted successfully.`)
        } else {
            toastr.error("Unable to delete project.")
        }
    })
    
}

function updateProject(rowToUpdate) {
    project = {
        id: rowToUpdate.cells[0].innerHTML,
        title: rowToUpdate.cells[1].children[0].value,
        category: rowToUpdate.cells[2].children[0].value,
        technologies: rowToUpdate.cells[3].children[0].value,
        links: rowToUpdate.cells[4].children[0].value
    }

    fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify( project )
    }).then(res => {
        if (res.status == 200) {
            toastr.success(`Project with ID: ${project.id} updated!`)
        } else {
            toastr.error("Unable to update project.")
        }
    })
}


/*
<td>${escapeHTML(project.id)}</td>
<td>${escapeHTML(project.title)}</td>
<td>${escapeHTML(project.category)}</td>
<td>${escapeHTML(project.technologies)}</td>
<td>${escapeHTML(project.links)}</td>
            */

// <p>Links: ${escapeHTML(project.links.join(", "))}p>
document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("create-project").addEventListener("click", createProject)
})

