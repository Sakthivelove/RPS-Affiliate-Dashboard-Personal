export const SettingField: React.FC<{
    label: string;
    icon: React.ElementType;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    placeholder?: string;
  }> = ({ label, icon: Icon, value, onChange, type = "text", placeholder }) => (
    <div className="grid grid-cols-7 items-center gap-4">
      <label className="flex items-center gap-2 text-right">
        <Icon className="text-gray-500" /> {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="col-span-6 w-full p-2 text-black border border-gray-300 rounded-md"
      />
    </div>
  );