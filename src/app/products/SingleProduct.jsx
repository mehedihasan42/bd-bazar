import Image from 'next/image';
import Link from 'next/link';
import AddCartBtn from './AddCartBtn';

const SingleProduct = ({product}) => {
    const {_id,name,image,price} = product
    return (
        <div className="card w-96 h-96 mx-auto bg-base-100 shadow-xl">
        <figure><Image src={image} alt="Shoes" width={300} height={200}/></figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p><span className='text-orange-500 font-semibold'>Price:</span> {price} tk</p>
          <div className="card-actions justify-end">
            <Link href={`/products/${_id}`} className="btn btn-primary">View Deatils</Link>
            <AddCartBtn id={_id}/>
          </div>
        </div>
      </div>
    );
};

export default SingleProduct;