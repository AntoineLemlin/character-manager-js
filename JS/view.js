document.addEventListener("DOMContentLoaded", async function () {
  // I get the id from the url and remove the ?
  let queryString = location.search.substring(1);

  console.log(queryString);

  await getURL();

  obj.forEach(({ id, image, name, shortDescription, description }) => {
    if (id === queryString) {
      console.log(name);

      document.getElementById("image").src = `data:image/jpeg;base64,${image}`;
      document.getElementById("name").innerHTML = name;
      document.getElementById("short-description").innerHTML = shortDescription;
      document.getElementById("description").innerHTML = description;
    }
  });
});
