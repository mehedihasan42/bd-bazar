"use client"

const AddCartBtn = ({id}) => {
    let cart = [],
    isLoading;

    const isAlready = cart.findIndex((pd)=>pd._id === id)
    const handleAddToCart = async(id)=>{console.log(id)}

    return (
        <button className="btn btn-active btn-primary" onClick={()=>handleAddToCart(id)}>
            Add To Cart 
        </button>
    );
};

export default AddCartBtn;