import React, { useState, useEffect, cloneElement } from 'react';
import '../styles/ShoppingList.css';
import {
  getDoc,
  doc,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import ReadItem from '../components/ShoppingList/ReadItem';
import Edit from '../components/ShoppingList/Edit';
import axios from 'axios';
import { Autocomplete, TextField } from '@mui/material';
import { async } from '@firebase/util';

const ShoppingList = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editValueKey, setEditValueKey] = useState('');
  const [SelectTodos, setSelectTodos] = useState([]);
  const [Previoustodo, setPreviousTodo] = useState('');
  const [LocalData, SetLocalData] = useState([]);
  const [Condition, SetCondition] = useState('');

  const AutoComplete = async () => {
    axios
      .get(
        //a8034eddd0924996955f2838890b9761 
        //fa7d10c9b49249268540fcd39db9283b
        //075d827095ae4832835c9c0b0d282448
        'https://api.spoonacular.com/food/ingredients/search?apiKey=a8034eddd0924996955f2838890b9761&timeFrame=day?number=4&query=' +
          todo
      )
      .then((res) => {
        const dataOptions = res.data.results.map(({ id, name }) => ({
          label: name,
          value: id,
        }));
        setSelectTodos(dataOptions);
        console.log(SelectTodos);
      });
  };



useEffect ( () => {
const checkCondition = async () => {

  if (Condition === 'online') {
    const userSnapshot = await getDocs(
      query(
        collection(firestore, 'groceries'),
        where('uidd', '==', auth.currentUser?.uid)
      )
    );
    SetLocalData(userSnapshot);
  } 
  else {console.log("offline")}

}

checkCondition();
 

}, [Condition])

  const geTodos = async () => {
    const datalijst = [];
   navigator.onLine ? SetCondition('online')  : SetCondition('offline');


    console.log('snapshot opgehaald');
    LocalData.forEach((doc) => {
      const data = doc.data();
      console.log(data.todo);
      datalijst.push({
        ...doc.data(), //spread operator
        key: doc.id, // `id` given to us by Firebase
      });
    });
    setTodos(datalijst);
    localStorage.setItem('DataLijst', datalijst);
    console.log(localStorage.getItem('DataLijst'))
    setLoading(false);
    console.log(datalijst);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(todo);
      AutoComplete();
      console.log('LOGGED IN');
      geTodos();
      if (!user) {
        console.log('no user logged in');
      }
    });
  }, [loading, todo,  ]);

  const writeToDatabase = (label, value) => {
    addDoc(collection(firestore, 'groceries'), {
      todo: label,
      todoid: value,
      uidd: auth.currentUser?.uid,
    });
    setTodo('');
  };

  const handleEditClick = (event, todo) => {
    console.log('edit', todo);
    event.preventDefault();
    setEditValueKey(todo?.key);
  };

  const updateUser = async (key, todoLabel, todoValue) => {
    console.log('key', key, todoValue);
    const userDoc = doc(firestore, 'groceries', key);
    const newFields = { todo: todoLabel, todoid: todoValue };
    await updateDoc(userDoc, newFields);
    const index1 = todos.findIndex((todo) => todo?.key === key);
    todos[index1] = { label: todoLabel, value: todoValue };
    setEditValueKey(null);
  };

  const DeleteTodo = async (key) => {
    console.log('key', key);
    const userDoc = doc(firestore, 'groceries', key);
    await deleteDoc(userDoc);
    const index1 = todos.findIndex((todo) => todo?.key === key);
    setTodos((prev) => prev.filter((el) => el?.key !== todos[index1]?.key));
  };

  const HandleSelect = (event, value) => {
    console.log('select', value);
    event.preventDefault();
    setTodo(value);
    writeToDatabase(value.label, value.value);
    setTodo('');
  };

  const HandleEditSelect = (event, value) => {
    console.log('select');
    event.preventDefault();
    setTodo(value);
    updateUser(Previoustodo.key, value.label, value.value);
  };

  if (loading) {
    return <h1>loading firebase data...</h1>;
  }

  return (
    <div className="IngredientPage">
      <h1>Ingredient List</h1>

      <div className="IngredientList">
        <div className="AutoComplete">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={SelectTodos}
            onChange={HandleSelect}
            className="SearchBar"
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Ingredient"
                onChange={(e) => setTodo(e.target.value)}
              />
            )}
          />
        </div>

        <div className="IngredientContainer">
          {todos?.map((todo) =>
            editValueKey === todo?.key ? (
              <div>
                <Edit
                  SelectTodos={SelectTodos}
                  setPreviousTodo={setPreviousTodo}
                  setTodo={setTodo}
                  todo={todo}
                  HandleEditSelect={HandleEditSelect}
                />
              </div>
            ) : (
              <div>
                <ReadItem
                  todo={todo}
                  handleEditClick={handleEditClick}
                  DeleteTodo={DeleteTodo}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
export default ShoppingList;
