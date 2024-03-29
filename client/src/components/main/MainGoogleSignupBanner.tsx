'use client';

import Image from 'next/image';

import useGoogleLogin from '@/hooks/useGoogleLogin';
import { useRouter } from 'next/navigation';

export default function MainGoogleSignupBanner() {
  const router = useRouter();

  const { onGoogleLogin, googleOauth } = useGoogleLogin();

  const goToGoogleSignup = () => {
    router.push(`${googleOauth}`);

    onGoogleLogin;
  };

  return (
    <button
      onClick={() => goToGoogleSignup()}
      className="cursor-pointer mx-4 flex justify-between items-center gap-10 px-[25px] py-[21px] bg-[url('/assets/img/bg_wood_light.png')] border-[3px] border-brown-50 rounded-xl shadow-outer/down max-[500px]:px-[17px] max-[500px]:py-[14px] max-[500px]:gap-6">
      <Image
        className="max-[500px]:w-[36px]"
        src={'/assets/img/no_border_tree.svg'}
        alt="tree icon"
        width={40}
        height={40}
      />

      <p className="text-[1.8rem] font-bold text-brown-40 whitespace-nowrap max-[500px]:text-[1.4rem]">
        구글로<b className="text-brown-60">&nbsp;회원가입</b>
      </p>

      <Image
        className="max-[500px]:w-[36px]"
        src={'/assets/img/no_border_tree.svg'}
        alt="tree icon"
        width={40}
        height={40}
      />
    </button>
  );
}
