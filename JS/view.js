let queryString = location.search.substring(1);

document.addEventListener("DOMContentLoaded", async function () {
  // I get the id from the url and remove the ?

  await getURL();

  obj.forEach(({ id, image, name, shortDescription, description }) => {
    if (id === queryString) {
      console.log(name);

      document.getElementById("image").src = `data:image/jpeg;base64,${image}`;
      document.getElementById("name").innerHTML = name;
      document.getElementById("short-description").innerHTML = shortDescription;
      document.getElementById("description").innerHTML = description;
      document.getElementById(
        "btn-update"
      ).href = `create_character.html?${id}`;
    }
  });
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
