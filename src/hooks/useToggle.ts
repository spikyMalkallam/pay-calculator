import { useState } from "react";

export default function useToggle(initial = false): [boolean, () => void] {
    const [open, setOpen] = useState(initial);
    const toggle = () => setOpen((p) => !p);
    return [open, toggle];
}