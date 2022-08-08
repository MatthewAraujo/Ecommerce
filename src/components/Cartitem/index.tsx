import { Minus, Plus, Trash } from "phosphor-react";
import { useCart } from "../../hooks/useCart";
import styles from "./styles.module.scss";
interface cartItemProps{
    name: string
    id: string;
    amount: number;
}
export const CartItem = ({name,id,amount}: cartItemProps) => {
    const {addToCart, deleteFromCart,removeFromCart} = useCart();
    return (
        <div className={styles.cartitemContent}>
            <div>
                <h4>{name}</h4>
                <small>{id}</small>
            </div>
            <div className={styles.cartitemControls}>
                <button onClick={() => {addToCart({id,name})}}>
                    <Plus size='18'/>
                </button>
                <span>{amount}</span>
                <button onClick={()=>{
                    removeFromCart(id);
                }}>
                    <Minus size='18' />
                </button>
            </div>
            <button>
                <Trash onClick={()=>{
                    deleteFromCart(id);
                }}
                size='18'/>
            </button>
        </div>
    )
}