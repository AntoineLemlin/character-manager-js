window.addEventListener("load", function(){
  this.setTimeout(() => {
    document.getElementById("loader").style.display = "none"

  }, 1500)
})

// Function to display the cards on the main page
const displayCards = (obj) => {
  // For each person in the object...
  obj.forEach(({ id, image, name, description }) => {
    const target = document.getElementById("grid");
    // I get the template in the HTML...
    const template = document.getElementById("template-id");
    // ...and I clone it.
    let clone = template.content.cloneNode(true);

    // I get the image source in the clone and i replace it by the link of the image (cf: DataURL)
    clone.getElementById("image").src = `data:image/jpeg;base64,${image}`;
    // same with the name
    clone.getElementById("name").innerHTML = name;
    // same with the description
    clone.getElementById("description").innerHTML = description;
    // I pass the variable id in the url
    clone.getElementById("see-character").href = `view.html?${id}`

    // I add the clone to the grid container in the HTML
    target.appendChild(clone);
  });
};

// When the page loads
document.addEventListener("DOMContentLoaded", async function () {
  // I get the data from the url
  let url = await fetch("https://character-database.becode.xyz/characters");
  const obj = await url.json();

  // I display the cards
  displayCards(obj);
});



document.getElementById("search-bar").addEventListener("keyup", function(){
  let filter = this.value.toUpperCase();
  const cards = document.querySelectorAll("#card");

  cards.forEach((card) => {
    const namePerson = card.getElementsByTagName("h2")[0];

    if (namePerson.innerHTML.toUpperCase().indexOf(filter) > -1) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
});

