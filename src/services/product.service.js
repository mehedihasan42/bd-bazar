import 'server-only'
import DbConnect from "./DbConnect";
import { ObjectId } from 'mongodb';

export const getProductsFromDb = async(category_id) => {
   const db = await DbConnect()
   const productsCollection = db.collection("products")
   const query = {}
   if(category_id){
    query.category_id = category_id
   }
   return productsCollection.find(query).toArray()
};

export const getProductByIdFromDb = async(id) => {
   const db = await DbConnect()
   const productsCollection = db.collection("products")
   const query = {
      _id: new ObjectId(id)
   }
   return productsCollection.findOne(query)
};