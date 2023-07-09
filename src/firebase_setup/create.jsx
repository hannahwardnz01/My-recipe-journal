import { addDoc, collection } from "@firebase/firestore"
import { firestore } from "./firebase"
 
/**
 * Creates a new, empty, firebase reccord
 * @returns returns the new doc
 */

function Create () {
    const ref = collection(firestore, "test-data") 
    let doc; 
    const data = {
        testData : {
        title: '',
        description: '',
        difficulty: '',
        time: '',
        servings: '',
        imageURL: '',
        favourite: false,
        ingredients: [],
        method: [],
        rating: ''
    }}
    try {
     doc = addDoc(ref, data)
    } catch(err) {  
        console.log(err)
    }
    return doc;
}
 
export default Create;

