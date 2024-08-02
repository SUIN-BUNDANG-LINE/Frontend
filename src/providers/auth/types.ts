interface User {
  id: string;
  nickname: string;
}

interface AuthContext {
  user: User | null;
  setUser: (user: User | null) => void;
}

export type { User, AuthContext };
