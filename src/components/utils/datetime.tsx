const DateTimeUtil = {
  getDifferenceInDays(date1: Date, date2: Date) {
    const diffInMs =date2.getTime() - date1.getTime();
    return diffInMs / (1000 * 60 * 60 * 24);
  },

  getDifferenceInHours(date1: Date, date2: Date) {
    const diffInMs =date2.getTime() - date1.getTime();
    return diffInMs / (1000 * 60 * 60);
  },

  getDifferenceInMinutes(date1: Date, date2: Date) {
    const diffInMs =date2.getTime() - date1.getTime();
    return diffInMs / (1000 * 60);
  },

  getDifferenceInSeconds(date1: Date, date2: Date) {
    const diffInMs =date2.getTime() - date1.getTime();
    return diffInMs / 1000;
  },
};

export default DateTimeUtil;
