// import { useState } from "react";
import { useReducer } from "react";

const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
];




export default function ShoppingList() {

    // const [addedProducts, setAddedProducts] = useState([]);

    const [addedProducts, dispatch] = useReducer(cartReducer, [])

    function cartReducer(state, action) {
        switch (action.type) {
            case 'ADD_ITEM':
                const alreadyInCart = state.some((p) => p.name === action.payload.name)

                if (alreadyInCart) {
                    return state.map(p =>
                        p.name === action.payload.name
                            ? { ...p, quantity: p.quantity + 1 }
                            : p
                    );
                } else {
                    return [...state, { ...action.payload, quantity: 1 }];
                }

            case 'REMOVE_ITEM':
                return state.filter(p => p.name !== action.payload);

            case 'UPDATE_QUANTITY':
                const quantity = parseInt(action.payload.quantity)
                if (isNaN(quantity) || quantity < 1) return state;
                return state.map(p => {
                    if (p.name === action.payload.name) {
                        return { ...p, quantity }
                    } else {
                        return p;
                    }
                })

            default:
                return state;
        }
    }



    // function addToCart(product) {
    //     const alreadyInCart = addedProducts.some((p) => p.name === product.name)

    //     if (alreadyInCart) {
    //         updateProductQuantity(product.name)
    //     } else {
    //         setAddedProducts([...addedProducts, { ...product, quantity: 1 }])
    //     }
    // }

    // function updateProductQuantity(productName, newQuantity) {

    //     const quantity = parseInt(newQuantity)

    //     if (isNaN(quantity) || quantity < 1) {
    //         return;
    //     }

    //     const updatedCart = addedProducts.map(p => {
    //         if (p.name === productName) {
    //             return { ...p, quantity }
    //         }
    //         return p;
    //     })

    //     setAddedProducts(updatedCart)
    // }


    // function removeFromCart(productName) {
    //     const updatedCart = addedProducts.filter(p => p.name !== productName);
    //     setAddedProducts(updatedCart)
    // }



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
                                    // onClick={() => addToCart(product)}
                                    onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}

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
                                            {/* <p>
                                                <span className="name">quantità: </span>
                                                {product.quantity}
                                            </p> */}

                                            <label>
                                                <span className="name">quantità: </span>
                                                <input
                                                    type="number"
                                                    min='1'
                                                    value={product.quantity}
                                                    // onChange={(e) => updateProductQuantity(product.name, e.target.value)}
                                                    onChange={(e) => dispatch({
                                                        type: 'UPDATE_QUANTITY',
                                                        payload: { name: product.name, quantity: e.target.value }
                                                    })}
                                                />
                                            </label>


                                            <button
                                                // onClick={() => removeFromCart(product.name)}
                                                onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: product.name })}

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