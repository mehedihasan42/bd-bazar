import getProducts from "@/utils/getProducts";
import SingleProduct from "./SingleProduct";



export const revalidate = 0

const products = async({searchParams:{category_id}}) => {
    const products = await getProducts(category_id)
    return (
        <div className='mt-10'>
            <div className='grid grid-cols-3 gap-3 mb-5'>
                 {
                    products.map((product)=>(
                         <SingleProduct key={product._id} product={product}></SingleProduct>
                    ))
                 }
            </div>
        </div>
    );
};

export default products;