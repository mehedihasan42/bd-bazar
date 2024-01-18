import { getProductByIdFromDb } from "@/services/product.service";
import getSingleProduct from "@/utils/getSingleProduct";

export const revalidate = 0;

const ProductsDetails = async({params:{id}}) => {
    const product = getSingleProduct(id);
    // const {name} = product
    return (
        <div>
            <h2 className="text-2xl">{product.name}</h2>
        </div>
    );
};

export default ProductsDetails;