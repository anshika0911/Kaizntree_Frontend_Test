import classNames from "classnames";
import { useRef } from "react";
import { InputCheckboxComponent } from "./types";

export const InputCheckbox: InputCheckboxComponent = ({ id, checked = false, disabled, onChange }) => {
  const inputIdRef = useRef(`KaizntreeInputCheckbox-${id}`);
  const inputId = inputIdRef.current;
  
  return (
    <div className="KaizntreeInputCheckbox--container" data-testid={inputId}>
      <label
        className={classNames("KaizntreeInputCheckbox--label", {
          "KaizntreeInputCheckbox--label-checked": checked,
          "KaizntreeInputCheckbox--label-disabled": disabled,
        })}
        htmlFor={inputId} // Add htmlFor to associate label with input
      >
      </label>
      <input
        id={inputId}
        type="checkbox"
        className="KaizntreeInputCheckbox--input"
        checked={checked}
        disabled={disabled}
        onChange={() => onChange(!checked)}
      />
    </div>
  );
};
