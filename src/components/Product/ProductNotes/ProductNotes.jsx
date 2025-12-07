import React from 'react';
import './ProductNotes.css';

function ProductNotes({notes = []}) {
  if (!notes) return null;
  
  return (
    <div className="ProductNotes">
      <h4>Notas:</h4>
      <ul>
      { notes.map((note,i)=> { return (
        <li key={i} className={note.class}>
          {note.data}
        </li>
        )
      })}
      </ul>
    </div>
  );
}

export default ProductNotes;
