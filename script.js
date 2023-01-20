function RenderHome() {
    let response = product.map( item => `
        <div class='food-card'> 
            <img src='${item.img}' alt='No Img'>
                <div class='item'>  
                    <div class='name-price'>
                        <h6> ${item.name} </h6>
                        <h6> ${item.price}$ </h6>
                </div>
                <p> ${item.about} </p>
                <div class='btn-rate'>
                ${card.some(e => e.id === item.id) ? 
                    `<button onclick="removeToCard(${item.id})" class="btn btn-danger btn-block"> - </button> ` :
                    `<button onclick="addCard(${item.id})" class="btn btn-warning btn-block"> + </button>`
                }
                <h3 class='isRate'> ${item.rate} </h3>
                </div>
            </div>
        </div>
    `).join(' ');
    $('#card').html(response)
}

let btn_open_modal = $('#modal-open');
let modal = $('#modal');
let submitCloseModal = $('#submit-close-modal');
let closeCloseModal = $('#close-close-modal');
let money = $('#cash');
let price_modal = $('.priceInTheModal')
let thank = $('.smile')

btn_open_modal.click( () => {
    modal.css('top' , '15%')
    renderModal()
    Total()
})
function submitClose() {
        if (card.length >= 1) {
            thank.css('display' , 'flex')
        modal.css('top' , '-73%')
        card = [];
        setInterval(() =>{
        thank.css('display' , 'none')
        } , 3000)
        $('#showerCardLength').html(card.length)
        } 
        RenderHome()
        renderModal()
    }
closeCloseModal.click( () =>{
    modal.css('top' , '-73%')
})

function shakeModal() {
    if (card.length == 0) {
        submitCloseModal.attr('class' , 'btn btn-success shake')
    } else {
        submitCloseModal.attr('class' , 'btn btn-success')
    }
}

function renderModal() {
    let res = card.map(item =>`
        <tr class='table'>
            <td><img class='ImgInTheModal' src=${item.img} ></td>
            <td class='nameInTheModal'>${item.name}</td>
             <td class='counterInTheModal'>
             <i class="bi bi-dash-circle-dotted" onclick='prev(${item.id})'></i>
             <div class='user-select'>
             ${item.count}
             </div>
             <i class="bi bi-plus-circle-dotted" onclick='addCount(${item.id})'></i>
             </td>
            <td class='priceInTheModal'>$${item.price * item.count}</td>
            <td class='btnInTheModal'><button onclick='removeToCard(${item.id})' class='btn btn-danger  '>Delete</button></td>
        </tr>
    `)
    $("#tbody").html(res)
    let respon = card.reduce((a,b) => a = a + (b.price * b.count) , 0 );
    shakeModal()
}
function addCard(id) {
    let res = product.find(item => item.id === id);
    card.push(res);
    $('#showerCardLength').html(card.length)
    console.log(card);
    RenderHome();
} 
function removeToCard(id) {
    let index = card.findIndex(e => e.id === id)
    card.splice(index, 1)
    $('#showerCardLength').html(card.length)
    RenderHome();
    renderModal();
    Total()
}
function Total() {
    let total = 0
    card.map(item =>{
        total = total + item.price * item.count;
    })
    money.html(total)
}
function addCount(id) {
    let index = card.findIndex(e => e.id === id)
    card[index].count += 1;
    renderModal()
    Total()
}
function prev(id) {
    let index = card.findIndex(e => e.id === id)
    card[index].count -= 1;
    if (card[index].count == 0) {
        let index = card.findIndex(e => e.id === id)
        card.splice(index, 1)
    }
    renderModal()
    RenderHome()
    Total()
}
RenderHome();
submitClose()

