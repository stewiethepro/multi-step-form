interface SelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  errorMessage: string;
  hasError: boolean;
  clearError: () => void;
}

export function Select({ label, options, value, onChange, errorMessage, hasError, clearError }: SelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
    clearError();
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        value={value}
        onChange={handleChange}
        className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${
          hasError ? 'border-red-500' : ''
        }`}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {hasError && <p className="mt-2 text-sm text-red-600">{errorMessage}</p>}
    </div>
  );
}