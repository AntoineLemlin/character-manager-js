const inputs = Array.from(document.querySelectorAll(".get-data"));
let base64String = "";

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

    document.location.href="index.html"
  });
