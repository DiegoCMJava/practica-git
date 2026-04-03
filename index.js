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
async function loadData() {
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
      section.appendChild(errorMsg);
    }
}
loadData();
});