import { getCsrfToken } from "next-auth/react";
import { useMemo } from "react";
import BigButton from "./big-button";
import s from "../styles/components/AddMonitorForm.module.css";

export default function AddMonitorForm() {
  const hourZones = useMemo(() => {
    let result = [];
    for (let i = 0; i < 24; i++) {
      const padded = String(i).padStart(2, "0");
      result.push({ value: i, option: `${padded}:00 - ${padded}:59` });
    }
    return result;
  }, []);

  return (
    <form action="/api/monitors/add" method="POST" className={s.form}>
      <input
        type="url"
        name="url"
        placeholder="URL страницы"
        className={s.url}
        required
      />
      <select name="hourZone" className={s.hour}>
        {hourZones.map(({ value, option }) => (
          <option value={value} key={value}>
            {option}
          </option>
        ))}
      </select>
      <BigButton submit>Добавить монитор</BigButton>
    </form>
  );
}
