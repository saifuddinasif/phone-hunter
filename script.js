

const loadPhones = async (searchText,dataLimit) => {
  const url =`https://openapi.programming-hero.com/api/phones?search=${searchText}`
  const res = await fetch(url);

  const data = await res.json();

  displayPhones(data.data, dataLimit);

 

}

const displayPhones = (phones,dataLimit) =>{

const phoneContainer =document.getElementById('phones-container')
phoneContainer.textContent = '';

/* display ten phones only  */
const showall =document.getElementById('showall')
if(phones.length >10 && dataLimit ){
  phones =phones.slice(0,10);
 showall.classList.remove('d-none')

}else{
  showall.classList.add('d-none')
}

/* display no phones  */
const noPhone =document.getElementById('not-found');

if(phones.length === 0 ){

  noPhone.classList.remove('d-none')


}else{
  noPhone.classList.add('d-none')
}





/* display alll phone  */
phones.forEach(phone => {
  const phoneDiv = document.createElement('div');
  phoneDiv.classList.add('col');

  phoneDiv.innerHTML =` 
  <div class="card-body p-5">
  <img src="${phone.image}" class="card-img-top" alt="...">
  <h5 class="card-title">${phone.phone_name}</h5>
  <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
  <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
<button  onclick="loadPhoneDetails('${phone.slug}')" class ='btn btn-primary'  data-bs-toggle="modal" data-bs-target="#exampleModal">show details <button>
</div>
  `
  phoneContainer.appendChild(phoneDiv)

})

// stop loader
toggleSpinner(false)
}



const processSearch = (dataLimit) => {
toggleSpinner(true);
const searchField = document.getElementById('search-field');
const searchText = searchField.value;
loadPhones(searchText,dataLimit)
}

document.getElementById('search-field').addEventListener('keypress', function(e) {

  if(e.key === 'Enter'){

    
processSearch(10)
  }
})

/* handle search button click  */
document.getElementById('btn-search').addEventListener('click', function(){
// start loader 

processSearch(10)

})

document.getElementById('search-field').addEventListener('keypress', function(e){

if(e.key === 'Enter'){

  processSearch(10)
}

})





const toggleSpinner = isLoading => {

  const   loadingSection = document.getElementById("loader")
  if(isLoading){
   loadingSection.classList.remove('d-none')
  }else{
    loadingSection.classList.add('d-none')
  }
}




 document.getElementById('btn-show-all').addEventListener('click',function(){

  processSearch()
}) 

const loadPhoneDetails = async id => {

  const url =` https://openapi.programming-hero.com/api/phone/${id}`

  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data)
}

const displayPhoneDetails = phone => {
const modalTitle = document.getElementById('exampleModalLabel')
const modalimage = document.getElementById('modalimage');
const phonedetails = document.getElementById('phone-details');

phonedetails.innerHTML =`

<p> Release Date: ${phone.releaseDate ? phone.releaseDate : "not found"} </p>

`




modalTitle.innerText = `${phone.name}`;
modalimage.src =`${phone.image}`



}

loadPhones()