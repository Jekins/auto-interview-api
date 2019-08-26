export const baseDomain = 'auto-interviews.ru';

export const shortMonths = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

export const authExpires = new Date( Date.now() + 1e3 * 3600 * 24 * 365 );

export const HOUR_MS = 3600 * 1000;
export const TIME_PERIODS = {
  minute: HOUR_MS / 60,
  hour: HOUR_MS,
  day: HOUR_MS * 24,
  week: HOUR_MS * 24 * 7,
  month: HOUR_MS * 24 * 31,
  year: HOUR_MS * 24 * 365.26
};

export const maxLimitDefault = 20;