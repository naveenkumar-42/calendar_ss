import React, { useState } from "react";
import "../styles/Modal.css";

const EventModal = ({ date, close, onSave }) => {
  const [text, setText] = useState("");

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Add Event on {date.format("MMM D, YYYY")}</h3>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Event name"
        />
        <div className="modal-actions">
          <button onClick={close}>Cancel</button>
          <button
            onClick={() => {
              if (text.trim()) onSave(text.trim());
              close();
            }}
          >Save</button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;