import { useRouter } from 'next/navigation';
import { HiLogout } from 'react-icons/hi';
import type { User as UserType } from '@/providers/auth/types';
import { useDropdown } from '@/hooks/useDropdown';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import Content from '@/components/ui/dropdown/Content';
import UserIcon from './UserIcon';
import styles from './User.module.css';

function DropdownContent({ user }: { user: UserType }) {
  const router = useRouter();

  return (
    <>
      <Content>
        <div className={styles.username}>
          <UserIcon user={user} />
          {user.nickname}
        </div>
      </Content>
      <br />
      <Content clickHandler={() => router.push('/logout')}>
        <HiLogout />
        로그아웃
      </Content>
    </>
  );
}

export default function User({ user }: { user: UserType }) {
  const { isOpen, fn, dropdownRef } = useDropdown();

  return (
    <Dropdown
      fixedContent={<UserIcon user={user} />}
      toggleContent={<DropdownContent user={user} />}
      dropdownRef={dropdownRef}
      isOpen={isOpen}
      fn={fn}
      style={{ width: '180px', right: '0', top: '42px' }}
    />
  );
}
