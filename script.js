const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('form-input');
const itemList = document.getElementById('item-list');



const itemFilter = document.getElementById("filter");

const clear =document.getElementById('clear')

const login_button = document.getElementById('log-in');

const old_screen = document.querySelector('.login');

const newScreen  = document.querySelector('.container')

const name = document.querySelector('#name');

const disName = document.getElementById('nme')
const contact = document.querySelector('#telephone')


  name.addEventListener('input', (e)=>{
     let x = e.target.value;

  })

function displayItems(){
  const itemFromStorage = getItemfromStorage();
  itemFromStorage.forEach(item => addItemtoDOM(item));
  checkUI()
}

function onAddItemSubmit(e){
    e.preventDefault();

    const newItem = itemInput.value;
    
    if(itemInput.value === ''){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Item Input cannot be Empty',
            confirmButtonText: 'Okay'
        });
        
    }
    // if(newItem === ''){
    //     alert('Item Input cannot be Empty');
    //     return;
    // }
    addItemtoDOM(newItem);

    addItemToStorage(newItem)
    checkUI();
    itemInput.value = "";
    
  
}

function addItemtoDOM(newItem) {
  const li = document.createElement('li');
  li.classList.add('fade-in'); // Add fade-in animation class

  li.appendChild(document.createTextNode(newItem));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  itemList.appendChild(li);

  if (itemList.children.length > 5) {
    itemList.classList.add('grid-layout');
  } else {
    itemList.classList.remove('grid-layout');
  }

  setTimeout(() => {
    li.classList.remove('fade-in'); // Remove animation class after a few seconds
  }, 500); // Duration of the animation
}

function addItemToStorage(item){
  const  itemFromStorage = getItemfromStorage();

  itemFromStorage.push(item);

  localStorage.setItem('item', JSON.stringify(itemFromStorage));
}
function getItemfromStorage(item){

  let itemFromStorage;

  if(localStorage.getItem(item)===null){
    itemFromStorage = [];
  }
  else{
    itemFromStorage =  JSON.parse(localStorage.getItem
    ('item'));
  }
  return itemFromStorage

}



function createButton(classes){
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon)
    return button;
}

function createIcon(classes){
    const icon = document.createElement('i');
    icon.className =classes;
    return icon;
}


function onClickItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
      removeItem(e.target.parentElement.parentElement);
    }
} 

function removeItem(item){
  if(confirm("Are you Sure?")){
    item.remove();

    remvoeItemFromStorage(item.textContent);
    checkUI();
  }
 
}

function remvoeItemFromStorage(item){
  const itemFromStorage = getItemfromStorage();
itemFromStorage = itemFromStorage.filter((i)=> i!==item);

localStorage.setItem("item", itemFromStorage);
}


function clearItems() {
  Swal.fire({
    title: 'Are you sure?',
    text: "This will remove all items from your list!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, clear it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.isConfirmed) {
      while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
      }
      checkUI();
      Swal.fire('Cleared!', 'Your shopping list is now empty.', 'success');
    }
  });
}

function showNextScreen(){
  
  old_screen.remove(); const newscreenElement = document.createElement("div");
  newScreen.style.background = 'linear-gradient(to right, #fff, #432343);'
  newScreen.style.display = 'block';


}

function checkUI(){
  const item = itemList.querySelectorAll('li')
  // console.log(item);
  if(item.length ===0){
    clear.style.display="none";
    itemFilter.style.display="none";
  }
  else{
    clear.style.display="block";
    itemFilter.style.display="block";
  }
}

function filterItems(e){
  
  const text = e.target.value.toLowerCase();
  const item = itemList.querySelectorAll('li')
 
  item.forEach((itm) =>{
    const itemName = itm.firstChild.textContent.toLocaleLowerCase();
   
    if(itemName.indexOf(text)!= -1){
      itm.style.display="flex";
    
    }
    else{
      itm.style.display="none";
    
    }
  })
}

function displayName(){
  
  name.addEventListener('input', function(e){
    disName.innerText = e.target.value;
  })

}
localStorage.setItem('name','Ankur')


function init(){

  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clear.addEventListener('click', clearItems);
  login_button.addEventListener('click', showNextScreen);
  itemFilter.addEventListener('input', filterItems);
  name.addEventListener('input', displayName);
  document.addEventListener('DOMContentLoaded', displayItems);

checkUI();

}
init();
