
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

loadButton.addEventListener("click", loadInternships)
