// I fetch the url and convert it to json
const getURL = async () => {
  let url = await fetch('https://character-database.becode.xyz/characters')
  return obj = await url.json()
}

// Function to display the cards on the main page
const displayCards = () => {
  // For each person in the object...
  obj.forEach(person => {
    const target = document.getElementById("grid")
    // I get the template in the HTML...
    const template = document.getElementById("template-id");
    // ...and I clone it.
    let clone = template.content.cloneNode(true);
  
    // I get the image source in the clone and i replace it by the link of the image (cf: DataURL)
    clone.getElementById("image").src = `data:image/jpeg;base64,${person.image}`
    // same with the name
    clone.getElementById("name").innerHTML = person.name
    // same with the description
    clone.getElementById("description").innerHTML = person.description
  
    // I add the clone to the grid container in the HTML
    target.appendChild(clone)
  })
}


// When the page loads
document.addEventListener('DOMContentLoaded', async function(){
  // I get the data from the url
  await getURL()
  console.log(obj)

  // I display the cards
  displayCards()

 





})

