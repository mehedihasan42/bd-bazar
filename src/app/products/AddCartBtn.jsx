"use client"

import useCart from "@/hooks/useCart";
import toast from "react-hot-toast";

const AddCartBtn = ({id}) => {
   const {cart,isLoading,mutate} = useCart()

    const isAlready = cart.findIndex((pd)=>pd._id === id)
    const handleAddToCart = async(id)=>{
        try {
            const res = await fetch(`/api/cart?id=${id}`,{
                method:"POST"
            })
            const result = await res.json()
            if(result.added){
                toast.success(result.message)
                mutate()
            }
            else{
                toast.error()
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <button className="btn btn-active btn-primary"
         onClick={()=>handleAddToCart(id)}
         disabled={isAlready !== -1 || isLoading}
         >
            {isAlready !== -1?"Already added":"Add to cart"}
        </button>
    );
};

export default AddCartBtn;