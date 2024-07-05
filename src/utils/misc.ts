function dateReader(date: string): string {
  const inputDate = new Date(new Date(date).toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  const currentDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));

  if (Number.isNaN(inputDate.getTime())) {
    return 'Invalid date';
  }

  const diffTime = Math.abs(currentDate.getTime() - inputDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return '오늘 마감';
  return `마감 ${diffDays}일 전`;
}

export { dateReader };
