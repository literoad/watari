import { ReactElement, useState } from "react";

import s from "../styles/components/DropdownButton.module.css";
import BigButton from "./big-button";

type Props = {
  label: ReactElement | string;
  children: ReactElement | ReactElement[] | string;
};

export default function DropdownButton({ label, children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={s.root}>
      <BigButton onClick={() => setOpen((o) => !o)}>{label}</BigButton>
      <div
        className={s.content}
        data-open={open}
        onClick={() => setOpen(false)}
      >
        {children}
      </div>
    </div>
  );
}
