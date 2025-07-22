const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

// Remplace ici par l'URL de ton backend (Node.js)
const API_URL = "https://ton-backend.onrender.com/ask";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = input.value;
  appendMessage(message, "user");
  input.value = "";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question: message })
    });

    const data = await response.json();
    appendMessage(data.answer, "bot");
  } catch (error) {
    appendMessage("❌ Erreur lors de la communication avec le serveur.", "bot");
  }
});

function appendMessage(message, sender) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.textContent = message;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
