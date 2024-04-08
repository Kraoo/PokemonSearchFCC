function searchPokemon() {
    var searchInput = document.getElementById("search-input").value.toLowerCase();
    fetch("https://pokeapi.co/api/v2/pokemon/" + searchInput)
      .then(response => {
        if (!response.ok) {
          throw new Error("Pokémon not found");
        }
        return response.json();
      })
      .then(data => {
        document.getElementById("pokemon-name").textContent = data.name.toUpperCase();
        document.getElementById("pokemon-id").textContent = "# " + data.id;
        document.getElementById("weight").textContent = "Weight: " + data.weight;
        document.getElementById("height").textContent = "Height: " + data.height;
        document.getElementById("hp").textContent = "HP: " + data.stats[0].base_stat;
        document.getElementById("attack").textContent = "Attack: " + data.stats[1].base_stat;
        document.getElementById("defense").textContent = "Defense: " + data.stats[2].base_stat;
        document.getElementById("special-attack").textContent = "Special Attack: " + data.stats[3].base_stat;
        document.getElementById("special-defense").textContent = "Special Defense: " + data.stats[4].base_stat;
        document.getElementById("speed").textContent = "Speed: " + data.stats[5].base_stat;
        document.getElementById("types").innerHTML = "";
        data.types.forEach(type => {
          var typeElement = document.createElement("span");
          typeElement.textContent = type.type.name.toUpperCase();
          typeElement.classList.add("type-" + type.type.name);
          document.getElementById("types").appendChild(typeElement);
        });
        var sprite = document.getElementById("sprite");
        if (data.sprites.front_default) {
          sprite.src = data.sprites.front_default;
          sprite.style.display = "inline";
        } else {
          sprite.style.display = "none";
        }
      })
      .catch(error => {
        alert(error.message);
      });
}

document.getElementById("search-button").addEventListener("click", searchPokemon);

document.getElementById("search-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchPokemon();
    }
});

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");
    const darkModeEnabled = body.classList.contains("dark-mode");
    localStorage.setItem("darkModeEnabled", darkModeEnabled);
}

document.getElementById("dark-mode-toggle").addEventListener("change", toggleDarkMode);

window.onload = function() {
    const darkModeEnabled = JSON.parse(localStorage.getItem("darkModeEnabled"));
    if (darkModeEnabled) {
        document.body.classList.add("dark-mode");
        document.getElementById("dark-mode-toggle").checked = true;
    }
};
