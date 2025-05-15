import { useState } from "react";

const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
];




export default function ShoppingList() {


    const [addedProducts, setAddedProducts] = useState([]);

    function addToCart(product) {
        const alreadyInCart = addedProducts.some((p) => p.name === product.name)
        if (!alreadyInCart) {
            setAddedProducts([...addedProducts, { ...product, quantity: 1 }])
        }
    }


    return (
        <>
            <div className="shopping_list">
                <h1>Shopping List</h1>
                <ul >
                    {products.map((product, i) => {
                        return (
                            <li key={i}>
                                <p>
                                    <span className="name">prodotto: </span>
                                    {product.name}
                                </p>
                                <p>
                                    <span className="price">prezzo: </span>
                                    {product.price.toFixed(2)} €
                                </p>
                                <button
                                    onClick={() => addToCart(product)}

                                >
                                    Aggiungi al carrello
                                </button>
                            </li>)
                    })}
                </ul>

                {addedProducts.length > 0 && (
                    <>
                        <div className="cart">
                            <h2>Carrello della spesa</h2>
                            <ul >
                                {addedProducts.map((product, i) => {
                                    return (
                                        <li key={i}>
                                            <p>
                                                <span className="name">prodotto: </span>
                                                {product.name}
                                            </p>
                                            <p>
                                                <span className="price">prezzo: </span>
                                                {product.price.toFixed(2)} €
                                            </p>
                                            <p>
                                                <span className="name">quantità: </span>
                                                {product.quantity}
                                            </p>

                                        </li>)
                                })}
                            </ul>
                        </div>
                    </>
                )}

            </div>
        </>
    )
}