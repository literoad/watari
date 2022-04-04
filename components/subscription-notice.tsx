import moment from "moment";

import s from "../styles/components/SubscriptionNotice.module.css";

import { WatariUser } from "../types";
import BigButton from "./big-button";

type Props = {
  user: WatariUser;
};

export default function SubscriptionNotice({ user }: Props) {
  let message = "";

  if (user.active) {
    message += "Оплаченный период ";
    message += user.rebill ? " действителен до " : " истекает ";
    message += moment(user.subscription.expires).format("LL");
  } else {
    message = "Для возобновления мониторинга по расписанию, продлите подписку";
  }

  return (
    <div className={s.container}>
      <p>{message}</p>
      {user.rebill ? (
        <button className={s.plainButton}>Отключить автопродление</button>
      ) : (
        <BigButton>Продлить на 30 дней (1&nbsp;500&nbsp;₽)</BigButton>
      )}
    </div>
  );
}
