export default function SelectInput({
    label,
    placeholder,
    options,
    defaultValue,
    handleChange,
    field,
}) {
    const handleSelectChange = (event) => {
        handleChange(field, event.target.value);
    };

    return (
        <div>
            <label className="font-semibold uppercase text-sm">{label}</label>
            <select
                defaultValue={defaultValue}
                className="w-full py-1 px-2 border border-gray-300 rounded"
                onChange={handleSelectChange}
            >
                <option value="">{placeholder}</option>
                {options?.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
