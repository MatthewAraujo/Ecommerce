import { ShoppingCart } from "phosphor-react";
import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { CartItem } from "../Cartitem";

import styles from "./styles.module.scss";

export const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { cart } = useCart();
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <h1>FruitCart</h1>
        <div className={isCartOpen ? styles.cartOpen : styles.cartClosed}>
            {
              cart.length ? (
                <>
                  {
                     cart.map(cart => (
                      <CartItem id={cart.id} name={cart.name} amount={cart.amount as number} />
                    ))
                     }
                  <button className={styles.finish}>Finalizar compra</button>
                  
                </>
              ) : (
                <span>Nada no Carrinho</span>
              )
            }
          </div>
        <button onClick={() => {
          setIsCartOpen(!isCartOpen);
        }}>
          <ShoppingCart size={24}/>
          {cart.length ? (
            <div>
              <span>{cart.length}</span>
            </div>
          ): ''}
        </button>
      </div>
    </header>
  )
}