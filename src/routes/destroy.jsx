import { redirect } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../firebase_setup/firebase"

export async function action({ params }) {
  const docRef = doc(firestore, "test-data", params.recipeID)
  await deleteDoc(docRef)
  return redirect("/homepage");
}