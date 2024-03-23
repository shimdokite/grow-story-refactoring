'use client';

import { createPortal } from 'react-dom';

import useModalStore, { ModalType } from '@/stores/modalStore';

import useUpdateChatAnsweredMutation from '@/hooks/mutation/useUpdateChatAnsweredMutation';
import useModal from '@/hooks/useModal';

import { ChatModal, InquiryListForm } from '.';

export default function CheckInquiry() {
  const { isOpen, type, close } = useModalStore();

  const { portalElement } = useModal(isOpen);
  const { mutate: onAnswered } = useUpdateChatAnsweredMutation();

  const handleAnswered = () => {
    onAnswered();
  };

  const renderModal = (type: ModalType) => {
    if (type === 'ChatModal') {
      return <ChatModal close={close} handleAnswered={handleAnswered} />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full h-full flex justify-center items-center">
        <InquiryListForm />
      </div>

      {isOpen && portalElement
        ? createPortal(renderModal(type), portalElement)
        : null}
    </div>
  );
}
