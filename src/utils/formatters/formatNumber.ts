export function formatNumber(value: number) {
  if (value < 10000) {
    return value.toLocaleString('ko-KR');
  }

  if (value >= 10000) {
    const result = Math.floor((value / 10000) * 10) / 10;
    return `${result.toLocaleString('ko-KR')}만`;
  }
}
