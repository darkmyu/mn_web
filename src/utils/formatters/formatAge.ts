import dayjs from '../dayjs';

export function formatAge(date: string) {
  const now = dayjs();
  const target = dayjs(date);

  const diff = now.diff(target, 'month');
  const years = Math.floor(diff / 12);
  const months = diff % 12;

  if (years > 0 && months > 0) {
    return `${years}살 ${months}개월`;
  }

  if (years > 0) {
    return `${years}살`;
  }

  return `${months}개월`;
}
