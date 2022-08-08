import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface CartProviderProps {
    children: ReactNode;
}
interface CartContextData{
    cart: Products[];
    addToCart:(data:Products) => void;
    deleteFromCart: (id:string) => void;
    removeFromCart: (id:string) => void;
}
interface Products{
    id: string;
    name: string;
    amount?: number
}
const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({children}: CartProviderProps){
    const [cart,setCart] = useState<Products[]>([]);
    
    useEffect(()=>{
        const localStorage = JSON.parse(window.localStorage.getItem('cart') as string)
        if(localStorage){
            setCart(localStorage)
        }
    }, [])

    useEffect(()=>{
        if(cart.length){
            window.localStorage.setItem('cart',JSON.stringify(cart)); 
        }
        
    },[cart]
    )

    function addToCart(data:Products){
        const fruit = cart.find(f=>f.id == data.id)
        
        if(!fruit){
            setCart([
                ...cart,
                {
                    ...data,
                    amount:1
                }
            ])
        }else{
            setCart(cart.map(p=> p.id=== fruit.id?{
                ...fruit,
                amount:fruit.amount as number +1} 
                : p))
        }
    }

    function removeFromCart(id:string){
        const fruit = cart.find(f=>f.id ==id)
        
        if(fruit){
            if(fruit.amount as number >1){
                setCart(cart.map(p=> p.id===fruit.id ? {
                    ...fruit,
                    amount: fruit.amount as number -1
                }:p))
            }
        }
    }
    
    function deleteFromCart(id: string){
        setCart(
            cart.filter(p => p.id!==id)
        )
    }
    
    
    return(
        <CartContext.Provider value={{cart,addToCart,deleteFromCart,removeFromCart}}>
            {children}
        </CartContext.Provider>
    )

}
export function useCart(){
    const context = useContext(CartContext)
    return context;
}