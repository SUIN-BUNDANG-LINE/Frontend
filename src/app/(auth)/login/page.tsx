export default function Page() {
  return (
    <div>
      <button type="button">google signin</button>
      <a href={`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/naver`}>네이버</a>
      <a href={`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`}>구글</a>
      <a href={`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao`}>카카오</a>
    </div>
  );
}
