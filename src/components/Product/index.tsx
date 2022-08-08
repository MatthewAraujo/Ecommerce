import { Info } from "phosphor-react";
import { useCart } from "../../hooks/useCart";
import styles from "./styles.module.scss";
interface fruit{
    id:string
    name: string;
    family:string;
    genus:string;
    order:string;
    nutritions: {       
        carbohydrates: number,    
        protein: number,   
        fat: number,   
        calories: number, 
        sugar: number   }
}
interface ProductProps{
    fruit: fruit;
    setData:(data:fruit)=> void;    
}
export function Product({fruit,setData}: ProductProps){
    const {addToCart} = useCart();
    return(
        <>  <div className={styles.nutrients}></div>
            <div className={styles.fruitsContent}>
                <h3>{fruit.name}</h3>
                <Info size={20} onClick={() => {setData(fruit);
                }} />
            <div>
                <span>{fruit.family}</span>
                <span>{fruit.genus}</span>
                {fruit.order !=='0' ?<span>{fruit.order}</span>:''}
            </div>
            <button onClick={()=> addToCart({
                 id:fruit.id,
                 name:fruit.name,
            })}>
                Adicionar
            </button>

        </div>
        
        </>
    )
}