document.addEventListener("DOMContentLoaded", function (){
    // declaring the base URL that will sserve as the API
    const baseURL = "http://localhost:3000"
    
    // Declaring variabes to populate the menu
    const menuItemOne = document.getElementById("itemone")
    const menuItemTwo = document.getElementById("itemtwo")
    const menuItemThree = document.getElementById("itemthree")
    
    // function to fetch data from meals in the db.json file to populatemenu
    function populateMenu(){
    fetch(`${baseURL}/meals`)
    .then (resp => resp.json())
    .then(data => {
        // use of inner HTML to populate the menu with items on the db.json
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
    }
    populateMenu();
    // function to fetch data from meals in the db.json file to pupulate the suggestions list
    function fetchAndPopulateSuggestions() {
        fetch(`${baseURL}/suggestions`) 
        .then(response => response.json())
        .then(data => {
            // Grabbing the suggestion list by its Id
            const suggestionList = document.getElementById('suggestion-list');
            // Empy the existing list of suggestions 
            suggestionList.innerHTML = '';
            // populating the suggestions list with suggestions from the db.json file
            data.forEach(suggestions => {
                const li = document.createElement('li');
                li.textContent = suggestions.suggestion;
                // intergrating of the delete feature to delete suggestions with a click by calling of the deleteSuggestion function 
                li.addEventListener('click', function (event) {
                    const target = event.target;
                    deleteSuggestion(suggestions.id)
                    li.remove();
                });
                suggestionList.appendChild(li);
            });
            
        })
        .catch(error => {
            console.error('Error fetching suggestions:', error);
        });
    }

    // function to add a suggestion through the text box and submit event 
    function addSuggestion(newSuggestion) {
        return fetch(`${baseURL}/suggestions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            suggestion:newSuggestion
        }),
        })
        .then(response => {
            if (response.ok) {
                // calling the PopulateSuggestions to update the suggestions
                fetchAndPopulateSuggestions();
            } else {
                console.error('Error updating the database:', response.status, response.statusText);
            }
        })
        .catch(error => {
            console.error('Error adding a suggestion:', error);
        });
    }


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



    // Function to delete a suggestion by ID
    function deleteSuggestion(suggestionId) {
        return fetch(`${baseURL}/suggestions/${suggestionId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        })
                
        .then(response => {
            if (response.ok) {
                console.log(`Suggestion with ID ${suggestionId} has been deleted.`);
                fetchAndPopulateSuggestions(); // Fetch and re-populate suggestions after deletion
            } else {
                console.error('Error updating the database:', response.status, response.statusText);
            }
        })
        .catch(error => {
            console.error('Error deleting suggestion:', error);
        });
    }

});