import Link from "next/link";
import { ReactChildren } from "react";
import s from "../styles/components/BigButton.module.css";

type Props = {
  disabled?: boolean;
  children: ReactChildren | string;
} & (
  | {
      href: string;
      onClick?: never;
      submit?: never;
    }
  | {
      href?: never;
      onClick(): void;
      submit?: never;
    }
  | {
      href?: never;
      onClick?: never;
      submit: true;
    }
);

export default function BigButton({
  href,
  onClick,
  children,
  disabled,
  submit,
}: Props) {
  const className = `text-shadow ${s.button} ${disabled ? s.disabled : ""}`;
  return href ? (
    <Link href={disabled ? "#" : href}>
      <a className={className}>{children}</a>
    </Link>
  ) : (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
      type={submit ? "submit" : undefined}
    >
      {children}
    </button>
  );
}
