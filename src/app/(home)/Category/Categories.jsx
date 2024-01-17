import getCategories from "@/utils/getCategories";
import Image from "next/image";
import SingleCategory from "./SingleCategory";

const Categories = async() => {
    const categories = await getCategories()
    return (
        <div className="grid grid-cols-4 mx-auto">
          {
            categories.map(categorie=><SingleCategory key={categorie._id} categorie={categorie}/>)
          }
        </div>
    );
};

export default Categories;