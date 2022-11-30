import React, { useState } from "react";
import '../../styles/ShoppingList.css';
import { Autocomplete, TextField } from "@mui/material";
const Edit = ({ SelectTodos, setTodo, HandleEditSelect , todo, setPreviousTodo}) => {
setPreviousTodo(todo);
  return (
    <div className="EditAutoComplete">
        <Autocomplete
        disablePortal
        className="SearchBar"
        options={SelectTodos}
        onChange={HandleEditSelect}
        sx={{ width: 300 }}
        value={todo?.todo}
        renderInput={(params) => <TextField {...params} label="Edit"  onChange={(e) => setTodo(e.target.value)}  />}

    />
    </div>
  );
};

export default Edit;
