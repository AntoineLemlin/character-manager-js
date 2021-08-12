// I fetch the url and convert it to json
const getURL = async () => {
    let url = await fetch("https://character-database.becode.xyz/characters");
    return (obj = await url.json());
  };