document.addEventListener("DOMContentLoaded", function (){
    const baseURL = "https://my-json-server.typicode.com/Yonkothe5th/sdf-phase1-project-The-Law-SteakHouse"
    
    const menuItemOne = document.getElementById("Itemone")
    const menuItemTwo = document.getElementById("Itemtwo")
    const menuItemThree = document.getElementById("Itemthree")

    function fetchMenu (){
        return fetchJSON(`$(baseURL}/meals`)
        .then(resp => resp.json())
        .then(funtion (){
        return populateMenu (meals)
        }
    }
    function populateMenu(data){
        menuItemOne.document.getElementByid('firstitem') = data.name;
    
        }
    } 
)