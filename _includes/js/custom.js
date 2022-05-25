
// This is required for the custom "tabs" implementation
function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
} 




// This is required for the custom "tabs" implementation
function openTabId(evt, contentName, groupName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  // if they belong to the correct class
  tabcontent = document.getElementsByClassName('tabcontent' + ' ' +groupName);
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }


  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName('tablinks' + ' ' + groupName);
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }


  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(contentName).style.display = "block";
  evt.currentTarget.className += " active";
}



const copyButtonLabel = " Copy";
const copyButtonHTML ='<span class="fa-solid fa-copy"></span>';
const copyButtonHTML2 ='<i class="fa-solid fa-check"></i>';
const buttonClass1="copybtn btn  fa-solid fa-copy";
const buttonClass2="copybtn-clicked btn  fa-solid fa-check";


async function copyCode(event) {
  const button = event.srcElement;
  const pre = button.parentElement;
  let code = pre.querySelector("pre");
  let text = code.innerText;
  await navigator.clipboard.writeText(text);
  
  //button.innerText = "Copied!";
  //button.innerHTML = copyButtonHTML2;
  //button.innerText = " Copied!";
  button.className = buttonClass2;
  
  setTimeout(()=> {
    //button.innerText = copyButtonLabel;
    //button.innerHTML = copyButtonHTML;
    button.className = buttonClass1;
  },1000)
}

async function copyCode2(event) { 
  const button = event.srcElement;
  const pre = button.parentElement;
  let code = pre.querySelector("code");
  let text = code.innerText;
  await navigator.clipboard.writeText(text);

  //button.innerText = "Copied!";
  //button.innerHTML = copyButtonHTML2;
  //button.innerText = " Copied!";
  button.className = buttonClass2;


  setTimeout(()=> {
    //button.innerText = copyButtonLabel;
    //button.innerHTML = copyButtonHTML;
    button.className = buttonClass1;

  },1000)
}


// this adds a copy-button to bash code blocks
let blocks = document.getElementsByClassName("language-bash");
window.onload = function () {
for (i = 0; i < blocks.length; i++) {
    blocks[i].classList.add("highlight-rel");
    let btn = document.createElement("button");
    btn.style.cssText += 'font-size:12px';
    btn.className = buttonClass1;
    btn.addEventListener("click", copyCode2);
    blocks[i].appendChild(btn);
}
}


/*
blocks.forEach((block) => {
  // only add button if browser supports Clipboard API
  if (navigator.clipboard) {
    let button = document.createElement("button");
    button.className = 'copybtn btn btn-blue fa-solid fa-copy';
    button.addEventListener("click", copyCode);
    block.appendChild(button);
  }
});
*/
