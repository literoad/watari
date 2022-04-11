import moment from "moment";
import { useRouter } from "next/router";
import { MouseEvent, useCallback } from "react";

import s from "../styles/components/SubscriptionNotice.module.css";

import { WatariUser } from "../types";
import DropdownButton from "./dropdown-button";

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

  const onProlongSubscription = useCallback(
    async (days: number, e: MouseEvent) => {
      e.preventDefault();
      const prolongRq = await fetch("/api/billing/prolong", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ days }),
      });
      const prolong = await prolongRq.json();
      window.open(prolong.url, "_blank");
    },
    []
  );
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
        <DropdownButton
          label={<span className={s.dropdownSpan}>Продлить сервис</span>}
        >
          <button
            onClick={(e) => onProlongSubscription(30, e)}
            className={s.dropdownContent}
          >
            Продлить на 30 дней (1&nbsp;500&nbsp;₽)
          </button>
          <button
            onClick={(e) => onProlongSubscription(180, e)}
            className={s.dropdownContent}
          >
            Продлить на 180 дней (-11%, 8&nbsp;000&nbsp;₽)
          </button>
        </DropdownButton>
      )}
    </div>
  );
}
