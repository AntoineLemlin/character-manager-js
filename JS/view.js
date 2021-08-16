// I get the id from the url and remove the ?
let queryString = location.search.substring(1);

document.addEventListener("DOMContentLoaded", async function () {
      let url = await fetch(`https://character-database.becode.xyz/characters/${queryString}`);
      const obj = await url.json();
      
      document.getElementById("image").src = `data:image/jpeg;base64,${obj.image}`;
      document.getElementById("name").innerHTML = obj.name;
      document.getElementById("short-description").innerHTML = obj.shortDescription;
      document.getElementById("description").innerHTML = obj.description;
      document.getElementById(
        "btn-update"
        ).href = `create_character.html?${obj.id}`;
        
});

document
  .getElementById("btn-delete")
  .addEventListener("click", async function () {
    if (confirm("Do you really want to delete this?")) {
      const response = await fetch(
        `https://character-database.becode.xyz/characters/${queryString}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json", // Indicates the content
          },
        }
      )
        .then((res) => console.log("Successfuly deleted"))
        .catch((error) => console.error(error)); // or res.json()

      document.location.href = "index.html";
    }
  });
