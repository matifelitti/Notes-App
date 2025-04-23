document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const textarea = document.getElementById("textarea");
  const cardContainer = document.getElementById("card-container");
  const themeToggle = document.getElementById("theme-toggle");

  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  const saveNotes = () => {
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  const renderNotes = () => {
    cardContainer.innerHTML = "";
    const sortedNotes = [...notes].sort((a, b) => b.pinned - a.pinned);
    sortedNotes.forEach((note) => createCard(note));
  };

  const createCard = (note) => {
    const card = document.createElement("div");
    card.className = "card";
    card.id = note.id;
    card.innerHTML = `
      <h6>${note.date}</h6>
      <textarea class="card-textarea">${note.text}</textarea>
      <div class="card-buttons">
        <button onclick="deleteCard(${note.id})">Delete</button>
        <button onclick="pinCard(${note.id})">${
      note.pinned ? "Unpin" : "Pin"
    }</button>
      </div>
    `;

    const textArea = card.querySelector(".card-textarea");
    textArea.addEventListener("input", () => {
      const updatedNote = notes.find((n) => n.id === note.id);
      updatedNote.text = textArea.value;
      saveNotes();
    });

    cardContainer.appendChild(card);
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newNote = {
      id: Date.now(),
      text: textarea.value,
      date: new Date().toLocaleString(),
      pinned: false,
    };
    notes.push(newNote);
    saveNotes();
    renderNotes();
    textarea.value = "";
  });

  window.deleteCard = (id) => {
    notes = notes.filter((note) => note.id !== id);
    saveNotes();
    renderNotes();
  };

  window.pinCard = (id) => {
    const note = notes.find((n) => n.id === id);
    note.pinned = !note.pinned;
    saveNotes();
    renderNotes();
  };

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark-mode") ? "dark" : "light"
    );
  });

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  renderNotes();
});
