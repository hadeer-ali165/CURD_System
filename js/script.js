var nameSite = document.getElementById("s-Name");
var urlSite = document.getElementById("s-url");
var btnSite = document.getElementById("submit");
var closeAlert = document.getElementById("hideAlert");
var alertError = document.getElementById("alertError");
var overlay = document.getElementById("overlay");
var PNameUrl = document.getElementById("NameUrl");
var searchURL = document.getElementById("search");
var arr = [];
// console.log(nameSite)

/*
1) catch the value form inputs   ====>
2) save data in empty array and local storage   
3) clear data from input   =====>
4) call data from local storage to website
*/
if(window.localStorage.getItem('urlInfo'))
    {
        arr = JSON.parse(localStorage.getItem('urlInfo'));
        showData();
    }

//create function for focus and blur 
var allInputs = document.querySelectorAll("input");
allInputs.forEach(function(onlyInput){
    onlyInput.addEventListener("focus",function(){
        onlyInput.style.boxShadow = "0 0 0 0.25rem #fec26099";
        onlyInput.style.outline = "none";
        allInputs.forEach(function(onInput){
            onInput.addEventListener("blur",function(){
                onlyInput.style.boxShadow = "none";
            })
        })
    })
})
//console.log(allInputs);

//function validation
function validName()
{
    var rgxName = /^[A-Z][a-z]{3,15}[0-9]*$/
    if(rgxName.test(nameSite.value) === true)
        {
            return true
        }
        alertError.style.display = "block";
        PNameUrl.classList.replace("d-none","d-block");
        overlay.style.display = "block";
        nameSite.style.backgroundColor = "red";
        return false
}
//console.log(valid())
function validUrl()
{
    var rgxName = /^[https:]/
    if(rgxName.test(urlSite.value) === true)
        {
            return true
        }
        alertError.style.display = "block";
        PNameUrl.classList.replace("d-none","d-block");
        overlay.style.display = "block";
        urlSite.style.backgroundColor = "red";
        return false
}

//catch value 
btnSite.addEventListener("click",function(){
    if(validName() === true && validUrl() === true)
        {
    var formURL = {
        URL_name : nameSite.value,
        URL_address : urlSite.value ,
    }
    arr.push(formURL);
    localStorage.setItem("urlInfo" , JSON.stringify(arr));
    clearData();
    showData();
    console.log(arr);
}
else if(validName() === false && validUrl() === false)
    {
        urlSite.style.backgroundColor = "red";
        urlSite.style.color = "#fff";
        nameSite.style.backgroundColor = "red";
        nameSite.style.color = "#fff";
    }
})

//function clear data from input

function clearData(){
    nameSite.value = "";
    urlSite.value = ""
}


//function show data 
function showData(){
var show = '';
for(let i = 0; i< arr.length; i++)
    {
        show += `
        <tr>
            <td>${i+1}</td>
            <td>${arr[i].URL_name}</td>
            <td><button class="btn btn-success" id="btnLink" OnClick= "openPage(${i})" ><i class="fa-solid fa-eye pe-2"></i> View</button></td>
            <td><button class="btn btn-danger text-light" OnClick= "clearArr(${i})"> <i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
        </tr>
        `
    }
    document.getElementById("showData").innerHTML = show;
}
function openPage(index){
    parent.open(arr[index].URL_address);
}

//function Delete data
function clearArr(index){
    arr.splice(index , 1);
    localStorage.setItem("urlInfo" , JSON.stringify(arr))
    showData();
}


//hide and show alert
closeAlert.addEventListener("click",function(){
    alertError.style.display = "none"
    overlay.style.display = "none"
});

// function search
function searched(item)
{
    var show = '';
    for(let i = 0; i< arr.length; i++)
    {
        if(arr[i].URL_name.toLowerCase().includes(item.toLowerCase()))
            {
                show += `
        <tr>
            <td>${i+1}</td>
            <td>${arr[i].URL_name}</td>
            <td><button class="btn btn-success" id="btnLink" OnClick= "openPage(${i})" ><i class="fa-solid fa-eye pe-2"></i> View</button></td>
            <td><button class="btn btn-danger text-light" OnClick= "clearArr(${i})"> <i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
        </tr>
        `
            }
    }
    document.getElementById("showData").innerHTML = show;
}
searchURL.addEventListener("input",function(){
    searched (searchURL.value)
})