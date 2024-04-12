import { useEffect, useRef, useState } from 'react';

import { CompatClient, Stomp, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import useChatStore from '@/stores/chatStore';
import useUserStore from '@/stores/userStore';

import { ChatData } from '@/types/data';

const useChat = (isNewChatConnect: boolean) => {
  const client = useRef<CompatClient>();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [connected, setConnected] = useState(false);
  const [chat, setChat] = useState<ChatData[]>([]);

  const { message, roomId, setMessage, setIsNewChatConnect } = useChatStore();
  const { accessToken, refreshToken, displayName, userId, setClear } =
    useUserStore();

  const url = process.env.NEXT_PUBLIC_API_URL;

  let subscription: StompSubscription | undefined;

  const entryMessage = () => {
    const adminId = 101;

    client?.current?.send(
      `/pub/chatRoom/enter`,
      {},
      JSON.stringify({ senderId: +userId, chatRoomId: +roomId, adminId }),
    );
  };

  useEffect(() => {
    if (!roomId) return;

    client.current = Stomp.over(() => new SockJS(`${url}/wss`));
    client.current.debug = () => {};
    client.current.connect(
      {
        Authorization: accessToken,
        refresh: refreshToken,
      },
      () => {
        subscription = client?.current?.subscribe(
          `/sub/chatRoom/${roomId}`,
          (payload) => {
            const receivedMessage: ChatData = JSON.parse(payload.body);

            setChat((previousChat) => [...previousChat, receivedMessage]);
          },
        );

        if (isNewChatConnect) {
          entryMessage();
        }

        setConnected(true);
      },
    );

    return () => {
      client.current?.disconnect(() => {
        subscription?.unsubscribe();
        setConnected(false);
        setIsNewChatConnect(false);
      });
    };
  }, [roomId]);

  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chat]);

  return { setConnected, setChat, client, scrollRef, chat, connected };
};

export default useChat;
