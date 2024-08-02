import { useRouter } from 'next/navigation';
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
          <UserIcon user={user} onClick={() => {}} />
          {user.nickname}
        </div>
      </Content>
      <br />
      <Content clickHandler={() => router.push('/logout')}>로그아웃 →</Content>
    </>
  );
}

export default function User({ user }: { user: UserType }) {
  const { isOpen, toggleDropdown, dropdownRef } = useDropdown();

  return (
    <Dropdown
      fixedContent={<UserIcon user={user} onClick={toggleDropdown} />}
      toggleContent={<DropdownContent user={user} />}
      isOpen={isOpen}
      dropdownRef={dropdownRef}
      style={{ width: '180px', right: '0', top: '42px' }}
    />
  );
}
