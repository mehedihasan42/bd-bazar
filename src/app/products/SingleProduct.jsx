import Image from 'next/image';
import Link from 'next/link';

const SingleProduct = ({product}) => {
    const {_id,name,image} = product
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
        <figure><Image src={image} alt="Shoes" width={300} height={200}/></figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <div className="card-actions justify-end">
            <Link href={`products/${_id}`} className="btn btn-primary">View Deatils</Link>
          </div>
        </div>
      </div>
    );
};

export default SingleProduct;