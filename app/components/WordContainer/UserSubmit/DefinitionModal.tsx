import React, { useState } from "react";

interface ModalProps {
  targetRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
  definition: string
}

const DefinitionModal: React.FC<ModalProps> = ({ targetRef, children, definition }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });




  const handleMouseEnter = () => {
    setVisible(true);

    const { top, left } = targetRef.current?.getBoundingClientRect() || {
      top: 0,
      left: 0,
    };

    if (targetRef.current) {
      setPosition({ top: top + targetRef.current?.offsetHeight, left });
    }
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  

  return (
    <>
      <div
        ref={targetRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      {visible && (
        <div
          className="absolute z-50 bg-slate-900 shadow-lg rounded-md p-4"
          style={{ top: position.top, left: position.left }}
        >
          {definition}
        </div>
      )}
    </>
  );
};

export default DefinitionModal;
