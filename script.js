let transactions = [];
let transactionId = 1;

const form = document.getElementById("transaction-form");
const tableBody = document.getElementById("transactions-table");
const chartCanvas = document.getElementById("expenseChart");
let chartInstance = null;

// ✅ Handle Add button click
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const type = document.getElementById("type").value;
  const description = document.getElementById("description").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const date = document.getElementById("date").value;

  if (!description || isNaN(amount) || !date) {
    alert("Please fill all fields");
    return;
  }

  const transaction = {
    id: transactionId++,
    type,
    description,
    amount,
    date,
  };

  transactions.push(transaction);
  renderTable();
  updateChart();
  form.reset();
});

// ✅ Render transaction table
function renderTable() {
  tableBody.innerHTML = "";

  transactions.forEach((t) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="p-2 border">${t.id}</td>
      <td class="p-2 border">${t.type}</td>
      <td class="p-2 border">${t.description}</td>
      <td class="p-2 border">₹${t.amount.toFixed(2)}</td>
      <td class="p-2 border">${t.date}</td>
      <td class="p-2 border">
        <button onclick="deleteTransaction(${t.id})" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// ✅ Delete a row
function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  renderTable();
  updateChart();
}

// ✅ Update chart
function updateChart() {
  const income = transactions.filter(t => t.type === "income").reduce((a, b) => a + b.amount, 0);
  const expense = transactions.filter(t => t.type === "expense").reduce((a, b) => a + b.amount, 0);

  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(chartCanvas, {
    type: "doughnut",
    data: {
      labels: ["Income", "Expense"],
      datasets: [{
        data: [income, expense],
        backgroundColor: ["#4ade80", "#f87171"],
        borderColor: ["#16a34a", "#dc2626"],
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        legend: {
          position: "bottom",
        }
      }
    }
  });
}
