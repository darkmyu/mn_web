import dayjs from '../dayjs';

export function formatDate(date: string) {
  const now = dayjs();
  const targetDate = dayjs(date);

  const diffSeconds = now.diff(targetDate, 'second');
  if (diffSeconds < 60) {
    return `${Math.max(0, diffSeconds)}초 전`;
  }

  const diffMinutes = now.diff(targetDate, 'minute');
  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  }

  const diffHours = now.diff(targetDate, 'hour');
  if (diffHours < 24) {
    return `${diffHours}시간 전`;
  }

  const diffDays = now.diff(targetDate, 'day');
  if (diffDays < 30) {
    return `${diffDays}일 전`;
  }

  const diffMonths = now.diff(targetDate, 'month');
  if (diffMonths < 12) {
    return `${diffMonths}개월 전`;
  }

  const diffYears = now.diff(targetDate, 'year');
  return `${diffYears}년 전`;
}
