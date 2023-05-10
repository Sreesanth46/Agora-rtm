type Props = {
    label: string;
    value: string;
    onChange: (e: any, inputName: string) => void;
    inputName: string;
};
export const AppInput = ({ label, value, onChange, inputName }: Props) => {
    const handleChange = (event: any) => {
        onChange(event.target.value, inputName);
    };

    return (
        <div>
            <label htmlFor={label}>{label}</label>
            <input
                name={inputName}
                type="text"
                id={label}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};
