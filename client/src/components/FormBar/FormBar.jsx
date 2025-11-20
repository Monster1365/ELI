import { Label, TextInput } from "flowbite-react";
import styles from "./FormBar.module.css";

export default function Component({ type, text }) {
  const place = `Enter your ${ text }`
  return (
    <div className="flex max-w-md flex-col gap-4" >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username3" color={ type }>
            Your { text }
          </Label>
        </div>
        <TextInput id="username" placeholder={ place } required color={ type }
        />
      </div>
    </div>
  );
}