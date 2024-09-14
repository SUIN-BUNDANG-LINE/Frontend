function dateParser(dateString: string) {
  const inputDate = new Date(dateString);

  if (Number.isNaN(inputDate.getTime())) {
    return { valid: false, sign: 0, dayDiff: 0, hourDiff: 0, minuteDiff: 0 };
  }

  const kstDate = new Date(inputDate.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  const currentDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));

  const timeDiff = kstDate.getTime() - currentDate.getTime();
  const sign = timeDiff >= 0 ? 1 : 0;

  // Calculate differences
  const absDiff = Math.abs(timeDiff);
  const dayDiff = Math.floor(absDiff / (1000 * 60 * 60 * 24));
  const hourDiff = Math.floor((absDiff / (1000 * 60 * 60)) % 24);
  const minuteDiff = Math.floor((absDiff / (1000 * 60)) % 60);

  return { valid: true, sign, dayDiff, hourDiff, minuteDiff };
}

function convertToKst(dateString: string) {
  const inputDate = new Date(dateString);

  if (Number.isNaN(inputDate.getTime())) {
    return {
      year: 'invalid',
      month: 'invalid',
      date: 'invalid',
      hour: 'invalid',
      minute: 'invalid',
    };
  }

  const kstDate = new Date(inputDate.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));

  return {
    year: kstDate.getFullYear(),
    month: kstDate.getMonth() + 1,
    date: kstDate.getDate(),
    hour: kstDate.getHours(),
    minute: kstDate.getMinutes(),
  };
}

function yymmdd(dateString: string): string {
  const inputDate = new Date(dateString);

  if (Number.isNaN(inputDate.getTime())) {
    return 'invalid date.';
  }

  const kstDate = new Date(inputDate.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));

  return `${kstDate.getFullYear()}년 ${kstDate.getMonth() + 1}월 ${kstDate.getDate()}일`;
}

function dateReader(dateString: string): string {
  const { valid, sign, dayDiff, hourDiff, minuteDiff } = dateParser(dateString);

  if (!valid) return 'invalid date';

  if (sign === 0) return '마감된 설문';
  if (dayDiff > 30) return `${yymmdd(dateString)} 마감`;
  if (dayDiff > 0) return `마감 ${dayDiff}일 전`;
  if (hourDiff > 0) return `마감 ${hourDiff}시간 전`;
  if (minuteDiff > 0) return `마감 ${minuteDiff}분 전`;

  // should not happen
  return `마감된 설문`;
}

function dateReaderForMyPage(dateString: string): string {
  const { valid, sign, dayDiff, hourDiff, minuteDiff } = dateParser(dateString);

  if (!valid) return 'invalid date';
  if (sign === 0) return '마감된 설문';
  if (dayDiff > 0) return `마감 ${dayDiff}일 전`;
  if (hourDiff > 0) return `마감 ${hourDiff}시간 전`;
  if (minuteDiff > 0) return `마감 ${minuteDiff}분 전`;

  return `마감된 설문`;
}

export { dateParser, yymmdd, dateReader, convertToKst, dateReaderForMyPage };
