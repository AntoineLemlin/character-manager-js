var quill = new Quill('#editor', {
  theme: 'snow'
});
quill.root.dataset.placeholder = "Write the description here"

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

function checkInputs() {
  if (inputs[0].value == "") {
    inputs[0].style.border = "1px solid red";
  } else {
    inputs[0].style.border = "1px solid green";
  }
  if (inputs[1].value == "") {
    inputs[1].style.border = "1px solid red";
  } else {
    inputs[1].style.border = "1px solid green";
  }

  if (document.getElementById("editor").children[0].textContent == "") {
    document.getElementById("editor").style.borderColor = "red";
  } else {
    document.getElementById("editor").style.borderColor = "green";
  }
  if (base64String == "") {
    document.getElementById("preview-container").style.borderColor = "red";
  } else {
    document.getElementById("preview-container").style.borderColor = "green";
  }
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
      document.getElementById("counter-name").innerHTML = `${document.getElementById("fname").value.length}/20`;
      document.getElementById("counter-short-description").innerHTML = `${document.getElementById("short-description").value.length}/70`;
      document.getElementById("counter-description").innerHTML = `${document.getElementById("editor").children[0].textContent.length}/350`;
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

    if (
      (inputs[0].value == "" && inputs[1].value == "") ||
      document.getElementById("editor").children[0].textContent == "" ||
      base64String == ""
    ) {
      alert("Fill all the inputs");
      checkInputs();
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
        .then((success) => alert("Character added!"))
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
        .then((success) => alert("Character updated!"))
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

// Write a name - short description - Description
document.getElementById("fname").addEventListener("keyup", function () {
  console.log(this.value.length);
  document.getElementById("counter-name").innerHTML = `${this.value.length}/20`;
});

document.getElementById("short-description").addEventListener("keyup", function () {
  console.log(this.value.length);
  document.getElementById("counter-short-description").innerHTML = `${this.value.length}/70`;
});

quill.root.addEventListener("keyup", function(){
  if(this.children[0].textContent.length >= 350) {
    this.children[0].textContent = this.children[0].textContent.substr(0, 350);
    document.getElementById("counter-description").innerHTML = `350/350`
    alert("You reached the limit of characters")
}else{
  document.getElementById("counter-description").innerHTML = `${this.children[0].textContent.length}/350`
}
})



