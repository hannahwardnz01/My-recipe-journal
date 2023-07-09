import { getDocs, collection, doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase_setup/firebase";

export async function recipeLoader({ params }) {
    const docRef = doc(firestore, "test-data", params.recipeID)
    const docSnap = await getDoc(docRef);
    const recipe = docSnap.data().testData
    return { recipe: recipe, id: params.recipeID };
}

export async function recipesLoader() {
    const recipes = [{}]
    const querySnapshot = await getDocs(collection(firestore, "test-data"));
    querySnapshot.forEach((doc) => {
      const object = {data: doc.data().testData, id: doc.id}
      recipes.push(object);
    });
    return recipes
}

export async function multiLoader({ params }) {
    const recipes = [{}]
    const querySnapshot = await getDocs(collection(firestore, "test-data"));
    querySnapshot.forEach((doc) => {
      const object = {data: doc.data().testData, id: doc.id}
      recipes.push(object);
    });
    const docRef = doc(firestore, "test-data", params.recipeID)
    const docSnap = await getDoc(docRef);
    const recipe = docSnap.data().testData
    return { recipe: recipe, id: docSnap.id , recipes: recipes};
}