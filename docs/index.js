document.addEventListener("DOMContentLoaded", function (){
    const baseURL = "http://localhost:3000"
    
    const menuItemOne = document.getElementById("itemone")
    const menuItemTwo = document.getElementById("itemtwo")
    const menuItemThree = document.getElementById("itemthree")
    const suggestionsList = document.getElementById("suggestion-list")
    const suggestionForm = document.getElementById('suggestion-form');


    fetch(`${baseURL}/meals`)
    .then (resp => resp.json())
    .then(data => {

        menuItemOne.innerHTML = `'<h3 
        id="firstitem"><strong>${data[0].name}</strong>
        </h3>
        <img id="substituteimgone"
        alt="Picture of First meal goes here"
        src = "${data[0].image}"
        />
        <p 
        id = 'desciption of first meal'>${data[0].description}</p>
        </p>
        <p 
        id = 'price of the first meal'>${data[0].price}
        </p>`   

        menuItemTwo.innerHTML = `<h3
        id="seconditem"><strong>${data[1].name}</strong>
        </h3>
        <img id="substituteimgtwo"
        alt="Picture of Second meal goes here"
        src = "${data[1].image}"
        />
        <p 
        id = 'desciption of Second meal'>${data[1].description}
        </p>
        <p 
        id = 'price of the Second meal'>${data[1].price}
        </p>`

        menuItemThree.innerHTML = `<h3 
        id="thirditem"><strong>${data[2].name}</strong>
        </h3>
        <img id="substituteimgthree"
        alt="Picture of firstmeal goes here"
        src = "${data[2].image}"
        />
        <p 
        id = 'desciption of Third meal'>${data[2].description}
        </p>
        <p 
        id = 'price of the third meal'>${data[2].price}
        </p>`
    });

    // Function to fetch suggestions and populate them in an unordered list
function fetchAndPopulateSuggestions() {
    fetch(`${baseURL}/suggestions`) 
        .then(response => response.json())
        .then(data => {
            const suggestionList = document.getElementById('suggestion-list');
            suggestionList.innerHTML = '';

            data.forEach(suggestions => {
                const li = document.createElement('li');
                li.textContent = suggestions.suggestion;
                suggestionList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching suggestions:', error);
        });
}

// Function to add a new suggestion
function addSuggestion(newSuggestion) {
    fetch(`${baseURL}/suggestions`)
        .then(response => response.json())
        .then(data => {
            data.push({
                id: data.length + 1,
                suggestion: newSuggestion,
            });

            return fetch(`${baseURL}/suggestions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        })
        .then(response => {
            if (response.ok) {
                fetchAndPopulateSuggestions();
            } else {
                console.error('Error updating the database:', response.status, response.statusText);
            }
        })
        .catch(error => {
            console.error('Error adding a suggestion:', error);
        });
}

// Event listener for the form submission
const suggestionsForm = document.getElementById('suggestions-form');
suggestionsForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const suggestionInput = document.getElementById('suggestion');
    const newSuggestion = suggestionInput.value;

    if (newSuggestion) {
        addSuggestion(newSuggestion);
        suggestionInput.value = '';
    }
});

// Call the function to fetch and populate suggestions on page load
fetchAndPopulateSuggestions();


});