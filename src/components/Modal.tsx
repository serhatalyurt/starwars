import { useState } from "react";
import "./Modal.css";

const Modal: React.FC<{ onClosed: () => void }> = ({ children, onClosed }) => {
  const [show, setShow] = useState<boolean>(true);
  return (
    <div className="modal" style={{ display: show ? "block" : "none" }}>
      <div className="modal-content">
        <span
          className="close"
          onClick={() => {
            setShow(false);
            onClosed();
          }}
        >
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};
export default Modal;
