// prefixUrl이 없으므로 process.env.NEXT_PUBLIC_API_URL 추가

import Container from '@/components/social-login/Container';
import Button from '@/components/social-login/Button';

const providers = [
  {
    href: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/login/oauth/google?redirect_path=/`,
    name: '구글',
    provider: 'google',
  },
  {
    href: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/login/oauth/google?redirect_path=/`,
    name: '네이버',
    provider: 'naver',
  },
  {
    href: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/login/oauth/google?redirect_path=/`,
    name: '카카오',
    provider: 'kakao',
  },
];

export default function Page() {
  return (
    <Container>
      {providers.map(({ provider, href, name }) => (
        <Button provider={provider} href={href} name={name} key={provider} />
      ))}
    </Container>
  );
}
