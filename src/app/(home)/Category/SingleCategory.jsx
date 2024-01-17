import Image from "next/image";

const SingleCategory = ({categorie}) => {
    const {name,image} = categorie
    return (
        <div className="card card-compact w-80 bg-base-100 shadow-xl mx-auto h-80">
  <figure><Image src={image} width={500} height={300} alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">{name}</h2>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Details</button>
    </div>
  </div>
</div>
    );
};

export default SingleCategory;