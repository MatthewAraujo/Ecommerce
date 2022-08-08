import { Header } from "./components/Header";
import { Products } from "./components/Products";
import "./global.scss"
import { CartProvider } from "./hooks/useCart";
export function App() {
  return (
    <>
      <CartProvider>
        <Header/>
        <Products/>
      </CartProvider>


    </>
  )
}
