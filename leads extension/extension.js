
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const inputBtn = document.getElementById("input-btn");
let linkLeads = [];
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"));


function render(leads) {
       let list = '' ;
       for (let i = 0; i < leads.length; i++){
              list +=
              `
                <li>
                  <a href="'${leads[i]}'">
                       ${leads[i]}
                  </a>
                
                </li>
              
              `
       }
        ulEl.innerHTML = list;
}



tabBtn.addEventListener("click", function () {
       chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
    
              let tab = tabs[0];
              
              linkLeads.push(tab.url);
              localStorage.setItem("myLinks", JSON.stringify(linkLeads));
              render(linkLeads)
   
       });
       
});

if (linksFromLocalStorage){
        linkLeads = linksFromLocalStorage;
        render(linkLeads);
      
};


inputBtn.addEventListener('click', function () {
       linkLeads.push(inputEl.value)
       localStorage.setItem("myLinks", JSON.stringify(linkLeads));
       


        render(linkLeads);
})



deleteBtn.addEventListener('dblclick', function () {
       localStorage.clear();
       linkLeads = [];
       render(linkLeads);
})

