import Link from "next/link";
import { ReactChildren } from "react";
import s from "../styles/components/BigButton.module.css";

type Props = {
  href: string;
  children: ReactChildren | string;
};

export default function BigButton({ href, children }: Props) {
  return (
    <Link href={href}>
      <a className={s.button}>{children}</a>
    </Link>
  );
}
