document.addEventListener("DOMContentLoaded", () => {
  const srcInput = document.getElementById("src");
  const destInput = document.getElementById("dest");
  const weightInput = document.getElementById("weight");
  const addEdgeButton = document.getElementById("add-edge");
  const edgesTable = document.getElementById("edges-table");
  const submitButton = document.getElementById("submit-bellman-ford");
  const resultsTable = document.getElementById("results-table");
  const vertexCountInput = document.getElementById("vertex-count");

  document
    .getElementById("reset-bellman-ford")
    .addEventListener("click", () => {
      vertexCountInput.value = "";
      srcInput.value = "";
      destInput.value = "";
      weightInput.value = "";

   
      edgesTable.innerHTML = "";

      resultsTable.classList.add("hidden");
      resultsBody.innerHTML = "";
    });
  const graph = [];

 
  addEdgeButton.addEventListener("click", () => {
    const src = parseInt(srcInput.value.trim());
    const dest = parseInt(destInput.value.trim());
    const weight = parseFloat(weightInput.value.trim());

    if (isNaN(src) || isNaN(dest) || isNaN(weight)) {
      alert("Please provide valid numbers for src, dest, and weight!");
      return;
    }

    const edge = { src, dest, weight };
    graph.push(edge);

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td class="border border-gray-300 px-4 py-2">${src}</td>
        <td class="border border-gray-300 px-4 py-2">${dest}</td>
        <td class="border border-gray-300 px-4 py-2">${weight}</td>
      `;
    edgesTable.appendChild(newRow);

    srcInput.value = "";
    destInput.value = "";
    weightInput.value = "";
    srcInput.focus();

    console.log("Graph updated:", graph);
  });

  submitButton.addEventListener("click", () => {
    const V = parseInt(vertexCountInput.value.trim());
    if (isNaN(V) || V <= 0) {
      alert("Please provide a valid number of vertices!");
      return;
    }

    const dis = Array(V).fill(Infinity);
    const src = 0;
    dis[src] = 0;

    for (let i = 0; i < V - 1; i++) {
      for (const { src, dest, weight } of graph) {
        if (dis[src] !== Infinity && dis[src] + weight < dis[dest]) {
          dis[dest] = dis[src] + weight;
        }
      }
    }

    for (const { src, dest, weight } of graph) {
      if (dis[src] !== Infinity && dis[src] + weight < dis[dest]) {
        alert("Graph contains a negative weight cycle!");
        return;
      }
    }

    const resultsBody = resultsTable.querySelector("tbody");
    resultsBody.innerHTML = "";
    dis.forEach((distance, vertex) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td class="border border-gray-300 px-4 py-2">${vertex}</td>
          <td class="border border-gray-300 px-4 py-2">${distance}</td>
        `;
      resultsBody.appendChild(row);
    });

    resultsTable.classList.remove("hidden");
  });
});
