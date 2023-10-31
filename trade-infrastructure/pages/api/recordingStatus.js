// NextJS api to get the current recording status in order to update the frontend
import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
   try {
       const client = await clientPromise;
       const db = client.db("trades");

       const tradesOutput = await db
           .collection("status")
           .find({})
           .limit(5)
           .sort({_id:-1})
           .toArray();

       res.json(tradesOutput);
   } catch (e) {
       console.error(e);
   }
};