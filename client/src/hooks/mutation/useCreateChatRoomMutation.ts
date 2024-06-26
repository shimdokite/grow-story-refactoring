import { useMutation } from '@tanstack/react-query';

import { postCreateChatRoom } from '@/api/chat';

import useUserStore from '@/stores/userStore';
import useChatStore from '@/stores/chatStore';

const useCreateChatRoomMutation = (qnaTitle: string) => {
  const { userId } = useUserStore();
  const { setRoomId, setIsNewChatConnect } = useChatStore();

  const { mutate } = useMutation({
    mutationFn: () => postCreateChatRoom(+userId, qnaTitle),

    onSuccess: (data) => {
      const roomId = `${data.data.chatRoomId}`;

      setRoomId(roomId);
      setIsNewChatConnect(true);
    },
  });

  return { mutate };
};

export default useCreateChatRoomMutation;
