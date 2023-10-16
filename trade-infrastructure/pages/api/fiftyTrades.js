import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
   try {
       const client = await clientPromise;
       const db = client.db("trades");

       const tradesOutput = await db
           .collection("all-trades")
           .find({})
           .limit(50)
           .sort({_id:-1})
           .toArray();

       res.json(tradesOutput);
   } catch (e) {
       console.error(e);
   }
};