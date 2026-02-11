import { createContext, useEffect,useState } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios";
export const StoreContext= createContext(null);

const StoreContextProvider=(props) =>{
   

    //time-(1:34).
    const [cartItems,setCartItems]= useState({});
    
    const backendUrl = "http://localhost:4000"
    
    const [token,setToken]=useState("");
    const [food_list, setFoodList] = useState([])

    const addToCart= async (itemId)=>{
        if(!cartItems[itemId]){ //present.
           setCartItems((prev)=>({...prev,[itemId]:1})) //create entry.
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))  //“update prev cart data by 1”
        }
        if (token) {
            await axios.post(backendUrl + "/api/cart/add", { itemId }, { headers: { token } });
        }
    }
   
    const removeFromCart= async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
         if (token) {
            await axios.post(backendUrl + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    }
 
    //calculate total amounts of the products in the cart.
    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
            let itemInfo = food_list.find((product)=> product._id === item);
            totalAmount+= itemInfo.price* cartItems[item];
            }
        }
        return totalAmount;
    }
  
     const fetchFoodList = async () => {
        const response = await axios.get(backendUrl + "/api/food/list");
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(backendUrl + "/api/cart/get", {}, { headers:{ token } });
        setCartItems(response.data.cartData);
    }

    useEffect(() => {
           
         async function loadData() {
                await fetchFoodList();
                if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"));
               
            }
            }
            loadData();
    }, [])

    // we can use this food list any where.
    const contextValue={
       food_list,
       cartItems,
       setCartItems,
       addToCart,
       removeFromCart,
       getTotalCartAmount,
       backendUrl,
       token,
       setToken

    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
  
}

export default StoreContextProvider;


