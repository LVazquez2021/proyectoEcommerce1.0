/*  const buttonClick = document.querySelectorAll('.button');
 const btnComprar = document.getElementById('comprar');
 const tbody = document.querySelector('.tbody');
 console.log('btn', btnComprar);


 let carrito = [];


 buttonClick.forEach(btn => {
     btn.addEventListener('click', addToCarritoItem);
 });

 function addToCarritoItem(e) {
     const button = e.target;
     const item = button.closest('.card');
     const itemTitle = item.querySelector('.card-title').textContent;
     const itemPrice = item.querySelector('.priceTitle').textContent;
     const precio = itemPrice.slice(itemPrice.indexOf(':') + 1);
     const itemImg = item.querySelector('.card-img-top').src;

     const newItem = {
         title: itemTitle,
         precio: precio,
         img: itemImg,
         cantidad: 1
     }

     addItemCarrito(newItem);
 }

 function addItemCarrito(newItem) {
     const inputElemento = document.getElementsByClassName('input__elem');

     for (let i = 0; i < carrito.length; i++) {
         if (carrito[i].title.trim() === newItem.title.trim()) {
             carrito[i].cantidad++;
             const inputValue = inputElemento[i];
             inputValue.value++
                 carritoTotal();
             return null;
         }
     }
     carrito.push(newItem);
     renderCarrito();
 }

 function renderCarrito() {
     tbody.innerHTML = '';
     carrito.map(item => {
         const tr = document.createElement('tr');
         tr.classList.add('itemCarrito');
         const content = `
            <th scope="row">1</th>
            <td class="table__productos">
                <img src=${item.img} alt="img">
                <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__precio">${item.precio}</td>
            <td class="table__cantidad">
                <input type="number" min="1" value=${item.cantidad} class="input__elem">
            <button class="delete btn btn-danger">X</button>
            </td>
        `
         tr.innerHTML = content;
         tbody.appenchild(tr);

         tr.querySelector('.delete').addEventListener('click', removeItemCarrito)
     })
     carritoTotal();
 };


 function carritoTotal() {
     let total = 0;
     const itemCartTotal = document.querySelector('.itemCartTotal');
     carrito.forEach(item => {
         const precio = Number(item.precio.replace('$', ""));
         total = total + precio * item.cantidad;
     });
     itemCartTotal.innerHTML = `Total $${total}`
 };

 console.log(carrito);

 function removeItemCarrito(e) {
     const buttonDelete = e.target;
     const tr = buttonDelete.closest('.itemCarrito')
 } */