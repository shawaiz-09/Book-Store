
const books = [
    { id: 0, book_name: "The Count of Monte Cristo", book_price: 530, book_author: "Alexandre Dumas", book_image: "/assets/images/book19.jpg" },
    { id: 1, book_name: "Dracula", book_price: 70, book_author: "Bram Stoker", book_image: "/assets/images/book20.jpg" },
    { id: 2, book_name: "Best Originals", book_price: 30, book_author: "Napoleon Hill", book_image: "/assets/images/book21.webp" },
    { id: 3, book_name: "Winter Garden", book_price: 45, book_author: "Kristin Hannah", book_image: "/assets/images/book22.jpg" },
    { id: 4, book_name: "Reminders of Him", book_price: 25, book_author: "Hannah", book_image: "/assets/images/book23.jpg" },
    { id: 5, book_name: "Woman Down", book_price: 30, book_author: "Colleen Hoover", book_image: "/assets/images/book24.jpg" },
    { id: 6, book_name: "Sense and Sensibility", book_price: 60, book_author: "Jane Austen", book_image: "/assets/images/book25.jpg" },
    { id: 7, book_name: "How to Ruin a Wedding", book_price: 70, book_author: "Elba Luz", book_image: "/assets/images/book26.jpg" },
    { id: 8, book_name: "War and Peace", book_price: 100, book_author: "Leo Tolstoy", book_image: "/assets/images/book27.jpg" },
    { id: 9, book_name: "Adventures Beyond the Body", book_price: 10, book_author: "William Buhlman", book_image: "/assets/images/book38.jpg" },
    { id: 10, book_name: "Cities in Flight", book_price: 90, book_author: "Chingam", book_image: "/assets/images/book39.jpg" },
    { id: 11, book_name: "The Crying Killer", book_price: 40, book_author: "Jess Lourey", book_image: "/assets/images/book30.jpg" },
    { id: 12, book_name: "The Mayo Clinic Diabetes Diet", book_price: 80, book_author: "Donald", book_image: "/assets/images/book31.jpg" },
    { id: 13, book_name: "The Hidden Life of Trees", book_price: 60, book_author: "Peter Wohlleben", book_image: "/assets/images/book32.webp" },
    { id: 14, book_name: "The Company Man", book_price: 60, book_author: "Robert Jackson Bennett", book_image: "/assets/images/book33.jpg" },
    { id: 15, book_name: "Northmen: The Viking Saga", book_price: 90, book_author: "John Haywood", book_image: "/assets/images/book35.jpg" },
    { id: 16, book_name: "Keep Your Brain Alive", book_price: 30, book_author: "Lawrence F. Katz", book_image: "/assets/images/book36.jpg" },
    { id: 17, book_name: "In the Orchard", book_price: 70, book_author: "Peter Hobbs", book_image: "/assets/images/book37.jpg" },
]

const container = document.getElementById("bookcard3")

for (let i = 0; i < books.length; i++) {
    const card = document.createElement('div')
    card.className = 'book'
    book_id = i;
    card.innerHTML = `
    <img src="${books[i].book_image}" alt="" width="200px" height="300px">
    <span>${books[i].book_name}</span>
    <span>By: ${books[i].book_author}</span>
    <span>Price: ${books[i].book_price}$</span>
    <button class="addtocart-btn" onclick="addtocart(${books[i].id})">Add To Cart</button>
    `
        container.appendChild(card);
}

// const btns = document.querySelectorAll('.addtocart-btn');
// var data_obj = []
// const cart_container = document.getElementById("cartcontainer")

// btns.forEach(btn => {
//     btn.addEventListener('click', (event) => {
//         const clicked_btn = event.target;
//         const parent_div = clicked_btn.closest('div');
//         const divHTML = parent_div.querySelectorAll('span');
//         alert("Book added in your cart")
//         const book_data = {
//             book_name: `${divHTML[0].textContent}`,
//             book_price: `${divHTML[2].textContent}`

//         }
//         data_obj.push(book_data);
//         console.log(data_obj);
//         for (let i = 0; i < data_obj.length; i++) {
//             const cart_book = document.createElement('div')
//             cart_book.className = 'cart_book'

//             cart_book.innerHTML = `
//             <span>${data_obj[i].book_name}</span>
//             <span>${data_obj[i].book_price}</span>

//         `
//             cart_container.appendChild(cart_book);
//         }
//     })
// })

function getCart() {
    const cart = localStorage.getItem("legacy_cart")
    if (cart) {
        return JSON.parse(cart)
    }
    return []
}

function saveCart(cart) {
    localStorage.setItem("legacy_cart", JSON.stringify(cart))
}

function addtocart(bookid) {
    const book = books.find((b) => {
        return b.id === bookid;
    })

    if (!book) {
        return
    }

    let cart = getCart();
    const existing = cart.find((b) => {
        return b.id === bookid
    })

    if (existing) {
        existing.quantity = existing.quantity + 1;
    }
    else {
        cart.push({
            id: book.id,
            book_name: book.book_name,
            book_author: book.book_author,
            book_price: book.book_price,
            quantity: 1
        })
    }

    saveCart(cart)
    alert("book added")
    console.log(cart)
}

function renderCart() {
    let cart = getCart()
    console.log(cart)
    const container = document.getElementById("cartcontainer")
    const total_box = document.getElementById("cart-totalbox")

    if (!container) return

    if (cart.length === 0) {
        container.innerHTML = `
        <div class="emptycart">
            <h3>Your cart is empty. Add some books</h3>
            <a href="/pages/morebooks.html"><button>Add Books</button></a>
        </div>
        `
        if (total_box) total_box.style.display = 'none';
        return;
    }

    let html = ''
    let total = 0
    for (let i = 0; i < cart.length; i++) {
        const book = cart[i]
        const bookTotal = book.book_price * book.quantity
        total = total + bookTotal

        html += `
        <div class="cart-item-info">
            <h3>Book Name : ${book.book_name}</h3>
            <h3>Book Price : $${book.book_price}</h3>
            <button id="remove-btn" onclick="removebook(${book.id})">Remove</button>
        </div>
        `
        container.innerHTML = html

        if (total_box) {
            total_box.style.display = 'flex'
            document.getElementById("total-price").textContent = "$" + total
        }
    }
}



function removebook(bookid) {
    let cart = getCart()
    cart = cart.filter((b) => {
        return b.id !== bookid
    })

    saveCart(cart)
    renderCart()
}