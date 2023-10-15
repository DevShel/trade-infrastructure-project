import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
   try {
       const client = await clientPromise;
       const db = client.db("trades");

       const movies = await db
           .collection("all-trades")
           .find({})
           .limit(5)
           .sort({_id:-1})
           .toArray();

        

       res.json(movies);
   } catch (e) {
       console.error(e);
   }
};