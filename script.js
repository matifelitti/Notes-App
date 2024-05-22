document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const cardContainer = document.getElementById("card-container");
  const textarea = document.getElementById("textarea").value;
  const card = document.createElement("card");
  let date = new Date().toLocaleString();
  card.innerHTML = `
      <h6>${date}</h6>
      <div>${textarea}</div>
    `;
  cardContainer.appendChild(card);
});
