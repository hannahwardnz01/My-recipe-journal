import { updateDoc, doc } from "firebase/firestore";
import { firestore } from "./firebase";

/**
 * Overrides any existing data with a new set
 * @param {*} testData the new set of data
 * @returns the updated doc
 */


export async function Edit ({ params }){

    console.log(params.recipeID)
    console.log(params.testData)

    const docRef = doc(firestore, "test-data", params.recipeID)

    let docSnap;

    try {
        docSnap = await updateDoc(docRef, {testData : {...params.testData}})
    } catch(err) {  
        console.log(err)
    }
    return docSnap
}