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
        if (alreadyInCart) {
            updateProductQuantity(product.name)
        } else {
            setAddedProducts([...addedProducts, { ...product, quantity: 1 }])
        }
    }

    function updateProductQuantity(productName) {
        const updatedCart = addedProducts.map(p => {
            if (p.name === productName) {
                return { ...p, quantity: p.quantity + 1 }
            }
            return p;
        })

        setAddedProducts(updatedCart)
    }


    function removeFromCart(productName) {
        const updatedCart = addedProducts.filter(p => p.name !== productName);
        setAddedProducts(updatedCart)
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
                                            <button
                                                onClick={() => removeFromCart(product.name)}

                                            >
                                                Rimuovi dal carrello
                                            </button>

                                        </li>)
                                })}
                            </ul>

                            <p className="total">
                                Totale da pagare: {addedProducts.reduce((acc, p) => acc + p.price * p.quantity, 0).toFixed(2)} €
                            </p>

                        </div>

                    </>
                )}

            </div>
        </>
    )
}