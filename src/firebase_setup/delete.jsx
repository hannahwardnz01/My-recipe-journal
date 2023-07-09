import { deleteDoc, collection } from "@firebase/firestore"
import { firestore } from "./firebase"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
 
function deleteRecipe (id) {

  const recipeDoc = collection(firestore, "test-data", id) // Firebase creates this automatically


  const options = {
      title: 'Delete',
      message: 'Are you sure you want to delete this recipe?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => 
          {try {
              deleteDoc(recipeDoc)
          } catch(err) {
              console.log(err)
          }}
        },
        {
          label: 'No',
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      willUnmount: () => {},
      afterClose: () => {},
      onClickOutside: () => {},
      onKeypress: () => {},
      onKeypressEscape: () => {},
      overlayClassName: "overlay-custom-class-name"
    };

  confirmAlert(options);
}
 
export default deleteRecipe;

// const deleteUser = async (id) => {
//   const userDoc = doc(db, "users", id);
//   await deleteDoc(userDoc);
// };