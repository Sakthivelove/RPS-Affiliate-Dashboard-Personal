import React from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  type: "text" | "number";
}

const InputField: React.FC<InputFieldProps> = ({ id, label, value, onChange, type }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-lg font-medium text-gray-300 capitalize mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value.toString()}
        onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
        className="bg-gray-700 text-white p-3 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        placeholder={`Enter ${label}`}
      />
    </div>
  );
};

export default InputField;
