
let Name=document.querySelector('[name="Name"]')
let Price=document.querySelector('[name="Price"]')
let Taxes=document.querySelector('[name="Taxes"]')
let Ads=document.querySelector('[name="Ads"]')
let Descont=document.querySelector('[name="Descont"]')
let Pieces=document.querySelector('[name="pieces"]')
let Category=document.querySelector('[name="Category"]')
let Discription=document.querySelector('[name="Discription"]')
let Total=document.querySelector('small small')
let prodactContainer=[];
if (localStorage.prodact != null) {
    prodactContainer = JSON.parse(localStorage.prodact )
    disply(prodactContainer)
}
addEventListener('input', gettotal)
function gettotal() {
    $('[name="Descont"],[name="Ads"],[name="Taxes"],[name="Price"]').on('input',function  () {
        let result;
        if (Price.value !='')
        {
            result = (+Price.value + +Taxes.value + +Ads.value) - (Descont.value)
            $('small small').html(result);
            $('small').css('color','green');
        }
        else{
            $('small small').html('');
            $('small').css('color','red');
        }
});
}
document.addEventListener('keypress', function (e)
{
    if (e.keyCode ===13) 
    {
        CerateProdact()
    }
})
$('.Cerate').click(CerateProdact)
function  CerateProdact() { 
        let Prodact ={
            Name:Name.value,
            price:Price.value,
            taxes:Taxes.value,
            ads:Ads.value,
            descont:Descont.value,
            pieces:Pieces.value,
            category:Category.value,
            Discription:Discription.value,
            Total:Total.innerHTML,
        }
        prodactContainer.push(Prodact)
        localStorage.setItem('prodact', JSON.stringify(prodactContainer))
        clearInput()
        disply(prodactContainer)
}
function clearInput() {
    Name.value=''
    Price.value=''
    Taxes.value=''
    Ads.value=''
    Descont.value=''
    Pieces.value=''
    Category.value=''
    Discription.value=''
    Total.innerHTML=''
    $('small').css('color','red');
}
function disply(show) {
    let tibale = ``
    for (let index = 0; index < show.length; index++)
    {
        tibale +=`<tr>
        <td>${[index+1]}</td>
        <td>${show[index].Name}</td>
        <td>${show[index].price}</td>
        <td>${show[index].taxes}</td>
        <td>${show[index].ads}</td>
        <td>${show[index].descont}</td>
        <td>${show[index].pieces}</td>
        <td>${show[index].category}</td>
        <td>${show[index].Discription}</td>
        <td>${show[index].Total}</td>
        <td><button class="btn btn-warning btn-sm " onclick="EditProdact(${index})">Edit</button></td>
        <td><button class="btn btn-danger btn-sm" onclick="deleteProdact(${index})">delete</button></td>
        </tr>`
    }
    let tibaleUser = ``
    $('.tbody').html(tibale);
    if (show.length >0) {
        $('.delete-all').css('display','block');
    }
    else{
    $('.delete-all').css('display','none');
    }
    $('.delete-all span').html(show.length);
    
    for (let index = 0; index < show.length; index++)
    {
        tibaleUser +=`<div class=" col-md-3 text-center">
                        <span class="badge bg-secondary ms-2">20%</span>
                        <img src="img/1_qcn3jif2xarxwwfl_1.webp" alt="" class="w-100 ">
                        <h5>${show[index].Name} </h5>
                        <p>${show[index].Name}</p>
                        <h6 class="text-danger"> price ${show[index].Total} L.E <p class="text-decoration-line-through ms-1 fw-light text-dark"> price ${show[index].price+2000} L.E</p></h6>
                        </div>`
    }
    $('.display-card').html(tibaleUser);
}


function deleteProdact(index){
    prodactContainer.splice(index,1)
    localStorage.prodact=JSON.stringify(prodactContainer)
    disply(prodactContainer)
}


$('.delete-all').click( () =>{ 
    prodactContainer.splice(0)
    localStorage.prodact =JSON.stringify(prodactContainer)
    disply(prodactContainer)
});


let term;
function EditProdact (index) {
    prodactContainer.slice(index,1)
    $('.updat ,.Cancel').css('display','block');
    $('.Cerate').css('display','none');
    Name.value= prodactContainer[index].Name
    Price.value=prodactContainer[index].price
    Taxes.value=prodactContainer[index].taxes
    Ads.value=prodactContainer[index].ads
    Descont.value=prodactContainer[index].descont
    Pieces.value=prodactContainer[index].pieces
    Category.value=prodactContainer[index].category
    Total.innerHTML = prodactContainer[index].Total
    term = index
    scroll({ top:0,behavior:"smooth"})
} 


$('.Cancel').click( () =>{ 
    $('.updat ,.Cancel').css('display','none');
    $('.Cerate').css('display','block');
    clearInput()
})


$('.updat').click( () =>{ 
    $('.updat ,.Cancel').css('display','none');
    $('.Cerate').css('display','block');
    let updat ={
        Name:Name.value,
        price:+Price.value,
        taxes:+Taxes.value,
        ads:+Ads.value,
        descont:+Descont.value,
        pieces:+Pieces.value,
        category:Category.value,
        Total:Total.innerHTML,
    }
prodactContainer[term] = updat
localStorage.prodact = JSON.stringify(prodactContainer)
disply(prodactContainer)
clearInput()
});


$('.SearchByName').click( ()=> { 
    $('[placeholder=" Search by Name "]').css({'display':'block'});
    $('[placeholder=" Search by Category "]').css({'display':'none'});
});


$('.SearchByCategory').click( ()=> { 
    $('[placeholder=" Search by Name "]').css({'display':'none'});
    $('[placeholder=" Search by Category "]').css({'display':'block'});
});

$('[placeholder=" Search by Name "]').on('input',function () {
    let val = $('[placeholder=" Search by Name "]').val();
    let selected=[];
    for (let i = 0; i < prodactContainer.length; i++)
    {
        if(prodactContainer[i].Name.toLowerCase().includes(val.toLowerCase())==true){
            selected.push(prodactContainer[i])
            disply(selected)
        }
        else{
            disply(selected)
        }
    } 
})


$('[placeholder=" Search by Category "]').on('input',function () {
    let val = $('[placeholder=" Search by Category "]').val();
    let selected=[];
    for (let i = 0; i < prodactContainer.length; i++){
        if(prodactContainer[i].category.toLowerCase().includes(val.toLowerCase())==true){
            selected.push(prodactContainer[i])
            disply(selected)
        }
        else{
            disply(selected)
        }
    } 
})
