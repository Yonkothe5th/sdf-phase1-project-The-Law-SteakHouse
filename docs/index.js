document.addEventListener("DOMContentLoaded", function (){
    const baseURL = "http://localhost:3000"
    
    const menuItemOne = document.getElementById("itemone")
    const menuItemTwo = document.getElementById("itemtwo")
    const menuItemThree = document.getElementById("itemthree")
    const suggestionsList = document.getElementById("suggestion-list")



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
    })

    // fetch(`${baseURL}/suggestions`)
    // .then(resp => resp.json())
    // .then(data => { 
    //         console.log(data)
    //         const li = document.querySelector('#first-suggestion')
    //         li.textContent = (data[0].suggestion)
    //     }
    // )

    // Function to fetch suggestions and populate them in an unordered list
    function fetchAndPopulateSuggestions() {
        fetch(`${baseURL}/suggestions`) // Replace with the actual URL of your server
        .then(response => response.json())
        .then(data => {
            // const suggestionList = document.getElementById('suggestion-list'); // Assuming you have an <ul> with this ID
            suggestionsList.innerHTML = ''; // Clear the existing list

            data.forEach(suggestions =>{
            const li = document.createElement('li');
            li.textContent = suggestions.suggestion;
            suggestionsList.appendChild(li);
            });
        })
        .catch(error => {
        console.error('Error fetching suggestions:', error);
    });
    }

  // Call the function to fetch and populate suggestions
    fetchAndPopulateSuggestions();

        // suggestionsList.innerHTML = '<ul id="suggestion-list">'+
        // '<li>' + populateSuggestionList(data) +'</li>'+
        // '</ul>'
    

    
    //     function populateSuggestionList (data) {
    //         let suggestionsList = '';
    //         for (let i = 0; i < suggestions.length; i++) {
    //         suggestionsList += '<li data-index="' + i + '">' + suggestions[i] + '</li>';
    //         }
    //         return suggestionsList;
    //     }
    // )

    //     suggestionsList.innerHTML = '<ul id="suggestion-list">'+
    //     '<li>' + populateSuggestionList(data) +'</li>'+
    //     '</ul>'
})







    // fetchMenuData(`${baseURL}/meals/1`)
    // .then(populateMenu)
    // .catch(logError);

    
// fetch('http://localhost:3000/meals')
// .then(res => res.json())
// .then (data => {console.log(data)})