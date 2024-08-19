import { ReactNode, useState } from "react";
import { usePrimaryColor } from "../domain/theme/hooks";

interface HideableProps {
  initiallyVisible?: boolean;
  children: ReactNode;
}

export const Hideable: React.FC<HideableProps> = ({
  initiallyVisible,
  children,
}) => {
  const primaryColor = usePrimaryColor();
  const [visible, setVisible] = useState(initiallyVisible);

  const handleToggle = () => {
    setVisible(!visible);
  };

  return (
    <div className="hideable">
      {visible && children}
      <button
        className="tertiary"
        onClick={handleToggle}
        style={{ color: primaryColor }}
      >
        {visible ? "- hide" : "+ show"} details
      </button>
    </div>
  );
};
