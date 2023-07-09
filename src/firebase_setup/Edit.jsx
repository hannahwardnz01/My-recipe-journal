import { updateDoc, doc } from "firebase/firestore";
import { firestore } from "./firebase";

/**
 * Overrides any existing data with a new set
 * @param {*} testData the new set of data
 * @returns the updated doc
 */


export async function Edit ({ params }){

    console.log("here2")

    console.log(params.recipeID)


    const docRef = doc(firestore, "test-data", params.recipeID)


    let docSnap;

    let testData = {
        title: 'sucess',
        description: '',
        difficulty: '',
        time: '',
        servings: '',
        imageURL: '',
        favourite: false,
        ingredients: [],
        method: [],
        rating: ''}

    try {
        docSnap = await updateDoc(docRef, {testData : {...testData}})
    } catch(err) {  
        console.log(err)
    }
    console.log(docSnap)
    return docSnap
}