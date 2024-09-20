import { useState } from "react";

type CheckboxProps ={
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}
function Checkbox({ label, checked = false, onChange }: CheckboxProps) {
     const [isChecked, setIsChecked] = useState(checked);
     const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       setIsChecked(e.target.checked);
       if (onChange) {
         onChange(e.target.checked);
       }
     };
  return (
    <div className="flex items-center mb-4 p-2">
      <input
        id="default-checkbox"
        type="checkbox"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        onChange={handleCheckboxChange}
        checked={isChecked}
      />
      <label
        htmlFor="default-checkbox"
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
    </div>
  );
}

export default Checkbox
