import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import '../../styles/ShoppingList.css';
const ReadItem = ({ todo, handleEditClick, DeleteTodo }) => {
  return (
    <div className="IngredientCRUD">
      <input type="text" className="IngredientRead" placeholder="add todo.." value={todo?.todo} readOnly />
      <button
        onClick={(e) => {
          handleEditClick(e, todo);
        }}
      >
        <FaEdit />
      </button>
      <button
              onClick={(e) => {
                DeleteTodo(todo?.key);
              }}
            >
              {' '}
              <FaTrash />
            </button>
            
    </div>
  );
};

export default ReadItem;
