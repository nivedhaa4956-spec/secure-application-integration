
# Test Report
## Project: Secure Application Integration

### Objective
To verify the integration of the frontend, REST API, and database.

### Test Cases

| Test | Expected Result |
|---|---|
| Open application | Frontend page loads |
| Load internship records | API returns records |
| Submit valid internship details | Record is saved |
| Submit empty fields | Validation message appears |
| API unavailable | Error message is displayed |

### Status
Tests are documented for verification. Actual results must be confirmed by running the application locally.


On Tue, Oct 20, 2026, 7:39 PM DHAKSHAYANI T <sa24s028@sacas.ac.in> wrote:

const form = document.getElementById("internshipForm");
const message = document.getElementById("message");
const internshipList = document.getElementById("internshipList");
const loadButton = document.getElementById("loadButton");

const API_URL = "/api/internships";

function showMessage(text) {
  message.textContent = text;
}

async function loadInternships() {
  internshipList.replaceChildren();
  showMessage("Loading internship records...");

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Could not load records.");
    }

    const records = await response.json();

    records.forEach((item) => {
      const li = document.createElement("li");
      li.textContent =
        `${item.title || "Untitled"} — ${item.company || "Unknown company"} ` +
        `(${item.domain || "No domain"}, ${item.location || "No location"})`;

      internshipList.appendChild(li);
    });

    showMessage(`${records.length} record(s) loaded.`);
  } catch (error) {
    showMessage("Unable to load records. Please check the API server.");
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const internship = {
    title: document.getElementById("title").value.trim(),
    company: document.getElementById("company").value.trim(),
    domain: document.getElementById("domain").value.trim(),
    location: document.getElementById("location").value.trim()
  };

  if (Object.values(internship).some((value) => !value)) {
    showMessage("Please fill in all fields.");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(internship)
    });

    if (!response.ok) {
      throw new Error("Submission failed.");
    }

    form.reset();
    showMessage("Internship added successfully!");
    await loadInternships();
  } catch (error) {
    showMessage("Unable to add internship. Please check the API server.");
  }
});

loadButton.addEventListener("click", loadInternships);


On Tue, Oct 20, 2026, 7:35 PM DHAKSHAYANI T <sa24s028@sacas.ac.in> wrote:

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Secure Application Integration</title>
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      background: #f1f5f9;
      margin: 0;
      padding: 30px 16px;
      color: #1e293b;
    }

    main {
      max-width: 750px;
      margin: auto;
      background: white;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 4px 15px #00000010;
    }

    h1 {
      color: #1d4ed8;
    }

    input, button {
      width: 100%;
      padding: 12px;
      margin: 7px 0;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      font-size: 15px;
    }

    button {
      background: #2563eb;
      color: white;
      border: none;
      cursor: pointer;
    }

    button:hover {
      background: #1d4ed8;
    }

    li {
      background: #f8fafc;
      margin: 8px 0;
      padding: 12px;
      border-radius: 6px;
    }

    #message {
      overflow-wrap: anywhere;
    }
  </style>
</head>
<body>
  <main>
    <h1>Secure Application Integration</h1>
    <p>Manage internship records through an integrated web application.</p>

    <h2>Add Internship</h2>
    <form id="internshipForm">
      <input id="title" placeholder="Internship title" maxlength="100" required>
      <input id="company" placeholder="Company name" maxlength="100" required>
      <input id="domain" placeholder="Domain" maxlength="100" required>
      <input id="location" placeholder="Location" maxlength="100" required>
      <button type="submit">Add Internship</button>
    </form>

    <p id="message" role="status" aria-live="polite"></p>

    <h2>Internship Records</h2>
    <button id="loadButton" type="button">Load Records</button>
    <ul id="internshipList"></ul>
  </main>

  <script src="script.js"></script>
</body>
</html>
