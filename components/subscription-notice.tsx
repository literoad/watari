import moment from "moment";
import { useRouter } from "next/router";
import { useCallback } from "react";

import s from "../styles/components/SubscriptionNotice.module.css";

import { WatariUser } from "../types";
import BigButton from "./big-button";

type Props = {
  user: WatariUser;
};

function buildNoticeMessage(user: WatariUser) {
  let message = "";
  if (user.active) {
    message += "Оплаченный период ";
    message += user.rebill ? " действителен до " : " истекает ";
    message += moment(user.subscription.expires).format("LL");
  } else {
    message = "Для возобновления мониторинга по расписанию, продлите подписку";
  }
  return message;
}

export default function SubscriptionNotice({ user }: Props) {
  const router = useRouter();

  const onProlongSubscription = useCallback(async () => {
    const prolongRq = await fetch("/api/billing/prolong", {
      method: "POST",
    });
    const prolong = await prolongRq.json();
    window.open(prolong.url, "_blank");
  }, []);
  const onStopRebilling = useCallback(async () => {
    await fetch("/api/billing/stop", {
      method: "POST",
    });
    router.reload();
  }, [router]);

  const message = buildNoticeMessage(user);

  return (
    <div className={s.container}>
      <p>{message}</p>
      {user.rebill ? (
        <button onClick={onStopRebilling} className={s.plainButton}>
          Отключить автопродление
        </button>
      ) : (
        <BigButton onClick={onProlongSubscription}>
          Продлить на 30 дней (1&nbsp;500&nbsp;₽)
        </BigButton>
      )}
    </div>
  );
}
