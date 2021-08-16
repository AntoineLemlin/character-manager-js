// Array of all inputs which stocks all the values in the order of the HTML
const inputs = Array.from(document.querySelectorAll(".get-data"));
let base64String = "";
// Takes the data after the ? in the url (here the id)
let queryString = location.search.substring(1);
let exist = false;

function imageUploaded() {
  var file = document.querySelector("input[type=file]")["files"][0];

  var reader = new FileReader();

  reader.onload = function () {
    base64String = reader.result.replace("data:", "").replace(/^.+,/, "");

    document.getElementById(
      "preview"
    ).src = `data:image/jpeg;base64,${base64String}`;
  };
  reader.readAsDataURL(file);
}

// If the character already exists
document.addEventListener("DOMContentLoaded", async function () {
  let url = await fetch("https://character-database.becode.xyz/characters");
  const obj = await url.json();

  obj.forEach(({ id, image, name, shortDescription, description }) => {
    if (id === queryString) {
      exist = true;

      base64String = image; //In the function above, I set the preview as base64String
      document.getElementById(
        "preview"
      ).src = `data:image/jpeg;base64,${image}`;
      document.getElementById("fname").value = name; // value and not innerhtml !
      document.getElementById("short-description").value = shortDescription;
      document.getElementById("editor").children[0].innerHTML = description;
    }
  });
});

// upload
document
  .getElementById("add-character")
  .addEventListener("click", async function () {
    let values = inputs.map(({ value }) => value.trim());
    const descriptionEditor =
      document.getElementById("editor").children[0].innerHTML;
    

    if (values.some(({ value }) => value === "") || document.getElementById("editor").children[0].innerHTML === "") {
      alert("there is an input empty");
      return;
    }

    // object destructuring
    const [name, shortDescription, description] = values;

    // ! is to reverse the condition
    if (!exist) {
      const response = await fetch(
        "https://character-database.becode.xyz/characters",
        {
          // create a new character with POST because the character doesn't exist yet
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: base64String,
            name, // = name: name
            shortDescription,
            description: descriptionEditor,
          }),
        }
      )
        .then((success) => alert("Success"))
        .catch(console.error("There was an error"));
    } else if (exist) {
      const response = await fetch(
        `https://character-database.becode.xyz/characters/${queryString}`, // Don't forget the ${queryString}`
        {
          // update a character with PUT because the character exists
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: queryString,
            name,
            shortDescription,
            description: descriptionEditor,
            image: base64String,
          }),
        }
      )
        .then((success) => alert("Success"))
        .catch(console.error("There was an error"));
    }

    document.location.href = "index.html";
  });

document
  .getElementById("delete-character")
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
