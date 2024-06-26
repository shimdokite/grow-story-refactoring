'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import useUserStore from '@/stores/userStore';
import useSignStore from '@/stores/signStore';
import useChatStore from '@/stores/chatStore';

import useDeleteGuestMutation from '@/hooks/mutation/useDeleteGuestMutation';

import removeCookiesForUserId from '@/utils/removeCookiesForUserId';

interface HeaderNavProps {
  isMenuHover?: boolean;
  isProfileHover?: boolean;
}

export default function HeaderNav({
  isMenuHover,
  isProfileHover,
}: HeaderNavProps) {
  const router = useRouter();

  const { isEmailLogin, isGoogleLogin, isGuestMode, userId, setClear } =
    useUserStore();
  const { getSigninForm, getSignupForm } = useSignStore();
  const { setIsOpen } = useChatStore();

  const { mutate: onDeleteGuest } = useDeleteGuestMutation();

  const logout = () => {
    removeCookiesForUserId();
    setClear();

    getSigninForm(false);
    getSignupForm(false);

    router.push('/');
  };

  const guestLogout = () => {
    if (isGuestMode) {
      onDeleteGuest();
      getSigninForm(false);
      getSignupForm(false);
    }
  };

  return (
    <>
      <div className="absolute">
        {isProfileHover && (
          <div className="relative top-2 left-0 w-[75px] h-fit rounded-lg border-2 border-brown-70 bg-brown-50 shadow-outer/down">
            <div
              className="flex flex-col justify-center items-center text-[12px] text-brown-10 font-bold"
              onClick={() => setIsOpen(false)}>
              <div className="w-full flex justify-center items-center border-b border-brown-10 border-dashed py-[8px] border-opacity-80">
                {isGuestMode ? (
                  <Link href="/signup">회원 가입</Link>
                ) : (
                  <Link href="/profile">정보 수정</Link>
                )}
              </div>

              {isGuestMode ? null : (
                <div className="w-full flex justify-center items-center  border-b border-brown-10 border-dashed py-[8px] border-opacity-80">
                  <Link href={`/history/${userId}`}>내 게시글</Link>
                </div>
              )}

              <div
                className="flex justify-center py-2 px-[2px] cursor-pointer"
                onClick={isGuestMode ? guestLogout : logout}>
                {isGuestMode ? '게스트 종료' : '로그아웃'}
              </div>
            </div>
          </div>
        )}

        {isMenuHover && (
          <div className="relative top-[14px] left-[22px] w-[75px] h-fit rounded-lg border-2 border-brown-70 bg-brown-50 shadow-outer/down">
            <div className="flex flex-col justify-center items-center text-[12px] text-brown-10 font-bold">
              <div className="w-full flex justify-center items-center border-b border-brown-10 border-dashed py-[8px] border-opacity-80">
                <Link
                  href={
                    isEmailLogin || isGoogleLogin
                      ? `/garden/${userId}`
                      : '/signin'
                  }>
                  정원
                </Link>
              </div>

              <div className="w-full flex justify-center items-center  border-b border-brown-10 border-dashed py-[8px] border-opacity-80">
                <Link href="/board">커뮤니티</Link>
              </div>

              <div className="flex justify-center py-[8px] cursor-pointer">
                <Link
                  href={
                    isEmailLogin || isGoogleLogin
                      ? `/leafs/${userId}`
                      : '/signin'
                  }>
                  식물 카드
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
