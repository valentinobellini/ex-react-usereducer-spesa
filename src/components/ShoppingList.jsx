const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
];




export default function ShoppingList() {

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
                            </li>)
                    })}
                </ul>
            </div>
        </>
    )
}