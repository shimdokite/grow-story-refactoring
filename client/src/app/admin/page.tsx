'use client';

import { useRouter } from 'next/navigation';

import useUserStore from '@/stores/userStore';

import { CheckInquiry } from '@/components/admin';

import { ADMIN_USER_ID } from '@/constants/values';

export default function Admin() {
  const router = useRouter();

  const { userId } = useUserStore();

  if (userId !== ADMIN_USER_ID) {
    router.replace('/');
  }

  return (
    <div className="h-full flex justify-center items-center">
      <CheckInquiry />
    </div>
  );
}
