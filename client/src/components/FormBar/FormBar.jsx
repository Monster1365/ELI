import { Label, TextInput } from "flowbite-react";
import styles from "./FormBar.module.css";

export default function Component({ type, status, textType, name, value, onChange }) {
  const place = `Enter your ${ textType }`
  return (
    <div className="flex max-w-md flex-col gap-4" >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username3" color={ status }>
            Your { textType }
          </Label>
        </div>
        <TextInput
          id="username"
          type={type}
          placeholder={place}
          required color={status}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}