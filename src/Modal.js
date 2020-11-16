import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ number, onClose, recipes }) {
  const [info, setInfo] = useState({});
  useEffect(() => {
    setInfo(recipes[number]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function viewDetails() {
    window.location.href = `../detail/${info.id}`;
  }

  return createPortal(
    <>
      <div className="modal-backdrop show"></div>
      <div className="modal" tabIndex="-1" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Recipe Suggestion</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Name: {info.name}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={viewDetails}
              >
                View Details
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("root")
  );
}
