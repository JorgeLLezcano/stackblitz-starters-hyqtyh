import React from 'react';
import './style.css';
import { useState } from 'react';

function PopUp() {
  return (
    <div className="popup" style={{ opacity: 1 }}>
      <h2> no hay tareas</h2>
    </div>
  );
}

export default function App() {
  const [tarea, setTarea] = useState('');
  const [dia, setDia] = useState('');
  const [element, setElement] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  function hndlTarea(event) {
    event.preventDefault();
    if (tarea !== '') setElement([...element, { tarea, dia }]);
    setTarea('');
    setDia('');
  }
  function hndleClear(cardToDelete) {
    // completa la funcion para que borre el elemento card cuando se de clic a 'X'
    setElement(element.filter((card) => card !== cardToDelete));
  }
  function hndleClick(event) {
    const card = event.target.closest('.tarea');
    card.style.textDecoration =
      card.style.textDecoration === 'line-through' ? 'none' : 'line-through';
  }
  function handleEditClick(card) {
    setEditingCard(card);
    setEditMode(true);
  }

  function handleEditSubmit(event) {
    event.preventDefault();
    if (tarea !== '') {
      const editedCard = { ...editingCard, tarea, dia };
      setElement(
        element.map((card) => (card === editingCard ? editedCard : card))
      );
      setEditingCard(null);
      setEditMode(false);
      setTarea('');
      setDia('');
    }
  }

  return (
    <>
      <div className="formulario">
        <h1>TAREAS!</h1>
        {editMode ? (
          <form action="" onSubmit={handleEditSubmit}>
            <input
              type="text"
              value={tarea}
              onChange={(event) => setTarea(event.target.value)}
              placeholder="nueva tarea"
            />
            <input
              type="date"
              value={dia}
              onChange={(event) => setDia(event.target.value)}
            />
            <button type="submit">Guardar</button>
            <button onClick={() => setEditMode(false)}>Cancelar</button>
          </form>
        ) : (
          <form action="" onSubmit={hndlTarea}>
            <input
              type="text"
              value={tarea}
              onChange={(event) => setTarea(event.target.value)}
              placeholder="nueva tarea"
            />
            <input
              type="date"
              value={dia}
              onChange={(event) => setDia(event.target.value)}
            />
            <button>Submit</button>
          </form>
        )}
      </div>

      <div className="contenedor">
        {element.length === 0 ? <PopUp /> : ''}
        {element.map((card, id) => (
          <div key={id} className="tareas">
            <p className="tarea" onClick={hndleClick}>
              {card.tarea}
            </p>{' '}
            | <p>{card.dia}</p>{' '}
            <button onClick={() => hndleClear(card)} className="btn-tareas">
              X
            </button>
            <button onClick={() => handleEditClick(card)} className="edit">
              {' '}
              ✏{' '}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
