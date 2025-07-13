const form = document.getElementById("transaction-form");
const tableBody = document.querySelector("#transactions-table tbody");
const chartCanvas = document.getElementById("expenseChart");

let transactions = [];
let currentId = 1;

// Initialize Chart.js Pie Chart
const ctx = chartCanvas.getContext("2d");
let expenseChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Income", "Expense"],
    datasets: [{
      label: "Income vs Expense",
      data: [0, 0],
      backgroundColor: ["#28a745", "#dc3545"],
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom"
      },
      title: {
        display: false
      }
    }
  }
});

// Handle Form Submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const type = document.getElementById("type").value;
  const description = document.getElementById("description").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const date = document.getElementById("date").value;

  if (!description || !amount || !date) {
    alert("Please fill in all fields.");
    return;
  }

  const transaction = {
    id: currentId++,
    type,
    description,
    amount,
    date
  };

  transactions.push(transaction);
  addTransactionToTable(transaction);
  updateChart();
  form.reset();
});

// Add transaction row to the table
function addTransactionToTable({ id, type, description, amount, date }) {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${id}</td>
    <td>${type.charAt(0).toUpperCase() + type.slice(1)}</td>
    <td>${description}</td>
    <td>${amount.toFixed(2)}</td>
    <td>${date}</td>
    <td><button onclick="deleteTransaction(${id})">Delete</button></td>
  `;

  tableBody.appendChild(row);
}

// Delete a transaction
function deleteTransaction(id) {
  transactions = transactions.filter(tx => tx.id !== id);
  refreshTable();
  updateChart();
}

// Redraw table from transaction list
function refreshTable() {
  tableBody.innerHTML = "";
  transactions.forEach(addTransactionToTable);
}

// Update the chart data
function updateChart() {
  const income = transactions
    .filter(tx => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const expense = transactions
    .filter(tx => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  expenseChart.data.datasets[0].data = [income, expense];
  expenseChart.update();
}
