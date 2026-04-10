document.addEventListener("DOMContentLoaded", ()=> {
const gitSection = document.getElementById("gitSection");

// Crear tabla para section de git
function createTable(data){
    const table = document.createElement("table");
    table.border = "1"; // solo para prueba rápida. se quitará en un futuro

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    ["Comando", "Descripción"].forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    data.forEach(item => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = item.name;

        const descCell = document.createElement("td");
        descCell.textContent = item.description;

        row.appendChild(nameCell);
        row.appendChild(descCell);
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    gitSection.appendChild(table);
}

// cargar los datos de git.json
async function loadGitData() {
    try {
        const response = await fetch("git.json");

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);   
        }

        const data = await response.json();

        if (!Array.isArray(data)){
            throw new Error("El formato del JSON no es válido.")
        }
        createTable(data);
    } catch (error) {
        console.error("Error al cargar los datos:", error);
      const errorMsg = document.createElement("p");
      errorMsg.textContent = "No se pudieron cargar los comandos.";
      gitSection.appendChild(errorMsg);
    }
}
loadGitData();

// conceptsSection
const conceptsSection = document.getElementById("conceptsSection");
 function createConceptButtons(data){
    const container = document.createElement("div");

    data.forEach(item => {
        const button = document.createElement("button");
        button.textContent = item.name;
        button.classList.add("concept-button");

        button.addEventListener("click", () => {
            // verificar si ya existe un modal abierto
            if(document.querySelector(".modal")){
                return; // no crea otro modal si ya hay uno activo
            }
            const modal = document.createElement("div");
            modal.classList.add("modal");

            const modalContent = document.createElement("div");
            modalContent.classList.add("modal-content");

            const title = document.createElement("h3");
            title.textContent = item.name;

            const description = document.createElement("p");
            description.textContent = item.description;

            const closeBtn = document.createElement("span");
            closeBtn.textContent = "×";
            closeBtn.classList.add("close");
            closeBtn.addEventListener("click", () => modal.remove());

            modalContent.appendChild(closeBtn);
            modalContent.appendChild(title);
            modalContent.appendChild(description);
            modal.appendChild(modalContent);

            document.body.appendChild(modal);
        });
        container.appendChild(button)
    });

    conceptsSection.appendChild(container);
 }
 async function loadConceptsData() {
    try {
      const response = await fetch("concepts.json");
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

      const data = await response.json();
      if (!Array.isArray(data)) throw new Error("El formato del JSON no es válido.");

      createConceptButtons(data);
    } catch (error) {
      console.error("Error al cargar los datos:", error);
      const errorMsg = document.createElement("p");
      errorMsg.textContent = "No se pudieron cargar los conceptos.";
      conceptsSection.appendChild(errorMsg);
    }
  }

  loadConceptsData();

});