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

document.addEventListener("DOMContentLoaded", async function () {
  await getURL();

  obj.forEach(({ id, image, name, shortDescription, description }) => {
    if (id === queryString) {
      exist = true;

      base64String = image;
      console.log(image);
      document.getElementById(
        "preview"
      ).src = `data:image/jpeg;base64,${image}`;
      document.getElementById("fname").value = name;
      document.getElementById("short-description").value = shortDescription;
      document.getElementById("description").value = description;
    }
  });
});

// upload
document
  .getElementById("add-character")
  .addEventListener("click", async function () {
    let values = inputs.map(({ value }) => value.trim());

    if (values.some(({ value }) => value === "")) {
      console.log("there is an input empty");
      return;
    }

    const [name, shortDescription, description] = values;

    if (!exist) {
      const response = await fetch(
        "https://character-database.becode.xyz/characters",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: base64String,
            name,
            shortDescription,
            description,
          }),
        }
      );
    } else {
      const response = await fetch(
        `https://character-database.becode.xyz/characters/${queryString}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: queryString,
            name,
            shortDescription,
            description,
            image: base64String,
          }),
        }
      ).then(success => alert('Success')).catch(console.error("There was an error"));
    }

        document.location.href = "index.html"
  });
