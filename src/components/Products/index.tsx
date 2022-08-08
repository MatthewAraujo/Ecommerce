import { useEffect, useState } from "react"
import styles from "./styles.module.scss"
import { Product } from "../Product";
import { X } from "phosphor-react";
const api = "https://www.fruityvice.com/api/fruit/all"
interface Fruit{
        id:string;
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

export function Products () {
    const[fruits,setFruits] = useState<Fruit[]>([]);
    const [openData,setData] = useState<Fruit>({id:''}as Fruit);
    const[fruitModal,setFruitModal] = useState(false);
    useEffect(()=> {
        fetch(`https://kpz-no-cors.herokuapp.com/?api=${encodeURIComponent(api)}`).then(resp=> resp.json())
        .then(data=>setFruits(data))
    
    },[]); 
    function openFruit(data:Fruit){
        setData(data)
        setFruitModal(!fruitModal);
    } 
    return (
        <>
        {
          openData.id ? (
            <div className={fruitModal? styles.openFruitModal : styles.closedFruitModal}>
            <h2>{openData.name}</h2>
            <X size={24} onClick={() => {
              setFruitModal(!fruitModal);
            }}/>
            <ul>
              <li>Carboidratos: {openData.nutritions.carbohydrates} mg</li>
              <li>Proteinas: {openData.nutritions.protein}mg</li>
              <li>Gorduras: {openData.nutritions.fat} mg</li>
              <li>Calorias: {openData.nutritions.calories} mg</li>
              <li>Açucar: {openData.nutritions.sugar} mg</li>
            </ul>
          </div>
          ) : ''
        }
        <div className={styles.productsContainer}>
        <h1>Frutas</h1>
        <div className={styles.productsContent}>
          {fruits.map((fruit) => <Product setData={openFruit} key={fruit.id} fruit={fruit} />)}
        </div>
      </div>
      </>
    )
}