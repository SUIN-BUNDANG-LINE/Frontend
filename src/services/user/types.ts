interface User {
  id: string;
  nickname: string;
  role: string;
  phoneNumber: null | string;
  provider: string;
}

export type { User };
