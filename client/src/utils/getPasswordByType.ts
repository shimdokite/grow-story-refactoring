import { SIGN_VAILDATION } from '@/constants/contents';

export default function getPasswordByType(tag: string, password?: string) {
  if (tag === 'password') {
    return {
      validation: {
        required: true,
        pattern: {
          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/,
          message: SIGN_VAILDATION[tag],
        },
      },
    };
  }

  if (tag === 'passwordCheck' && password) {
    return {
      validation: {
        required: true,
        validate: (value: string) => value === password || SIGN_VAILDATION[tag],
      },
    };
  }

  return null;
}
