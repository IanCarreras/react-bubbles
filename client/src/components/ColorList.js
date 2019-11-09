import React, { useState } from "react";
import api from '../utils/api'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [error, setError] = useState()
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    api()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        let newColors = colors.map(color => color.id === res.data.id ? res.data : color)
        updateColors(newColors)
        setEditing(false)
      })
      .catch(err => {
        setError(err.response.data.message)
      })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    api()
    .delete(`/colors/${color.id}`)
    .then(res => {
      let newColors = colors.filter(color => res.data !== color.id ? color : null )
      updateColors(newColors)
    })
    .catch(err => {
      setError(err.response.data.message)
    })
  };

  const addColor = e => {
    e.preventDefault()

    api()
      .post('/colors', newColor)
      .then(res => {
        updateColors(res.data)
        setNewColor(initialColor)
      })
      .catch(err => {
        setError(err.response.data.message)
      })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {error && <div className='error'>{error}</div>}
      {!editing && (
        <form onSubmit={addColor}>
          <legend>Add Color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setNewColor({ ...newColor, color: e.target.value })
              }
              value={newColor.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setNewColor({
                  ...newColor,
                  code: { hex: e.target.value }
                })
              }
              value={newColor.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">Add</button>
          </div>
        </form>    
      )}
      <div className="spacer" />
    </div>
  );
};

export default ColorList;