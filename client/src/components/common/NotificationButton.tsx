import { useState } from 'react';

import NotificationPanel from './NotificationPanel';

import useEffectOnce from '@/hooks/useEffectOnce';

export default function NotificationButton() {
  const [isClicked, setIsClicked] = useState(false);
  const [hasNonChecked, setHasNonChecked] = useState(true);

  useEffectOnce(() =>
    window.addEventListener('click', handleButtonClick as any),
  );

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const clickedElement = e.target;

    const isChildOfNotification =
      (clickedElement as HTMLElement).closest('#notification') !== null;

    if (clickedElement instanceof HTMLElement)
      if (
        clickedElement.id === 'notification-button' ||
        clickedElement.id === 'notification-img'
      ) {
        setHasNonChecked(false);
        return setIsClicked((previous) => !previous);
      }

    if (!isChildOfNotification) {
      return setIsClicked(false);
    }

    setIsClicked(true);
    setHasNonChecked(false);

    return;
  };

  return (
    <div id="notification" className="fixed right-[16px] bottom-[72px] z-20">
      <button
        id="notification-button"
        className="w-[48px] h-[48px] border-[3px] border-brown-70 rounded-[50%] bg-[url('/assets/img/bg_wood_dark.png')] bg-contain bg-repeat flex justify-center items-center shadow-outer/down"
        onClick={handleButtonClick}>
        <img
          id="notification-img"
          alt="notification button"
          src="/assets/icon/notification.svg"
        />
      </button>
      {hasNonChecked && (
        <div className="w-[12px] h-[12px] border-2 border-brown-70 rounded-[50%] bg-red-50 absolute top-0 right-[6px]"></div>
      )}
      {isClicked && <NotificationPanel />}
    </div>
  );
}
