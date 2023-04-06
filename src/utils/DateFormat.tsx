export const postDate = (date: string) => {
  const currentDate = Date.now();
  const currentYear = new Date().getFullYear();
  const epochDate = new Date(date).getTime();
  const postYear = new Date(date).getFullYear();

  const timeElapsed = currentDate - epochDate;

  const secondsElapsed = Math.floor(timeElapsed / 1000);
  if (secondsElapsed < 60) {
    if (secondsElapsed <= 1) {
      return "A SECOND AGO";
    }
    return `${secondsElapsed} SECONDS AGO`;
  }
  const minutesElapsed = Math.floor(secondsElapsed / 60);
  if (minutesElapsed < 60) {
    if (minutesElapsed === 1) return `${minutesElapsed} MINUTE AGO`;
    return `${minutesElapsed} MINUTES AGO`;
  }
  const hoursElapsed = Math.floor(minutesElapsed / 60);
  if (hoursElapsed < 24) {
    if (hoursElapsed === 1) return `${hoursElapsed} HOUR AGO`;
    return `${hoursElapsed} HOURS AGO`;
  }
  const daysElapsed = Math.floor(hoursElapsed / 24);
  if (daysElapsed < 8) {
    if (daysElapsed === 1) return `${daysElapsed} DAY AGO`;
    return `${daysElapsed} DAYS AGO`;
  }
  if (currentYear === postYear) {
    const options = { month: "long", day: "numeric" } as const;
    return new Date(date).toLocaleDateString("en-US", options).toUpperCase();
  }
  const options = { month: "long", day: "numeric", year: "numeric" } as const;
  return new Date(date).toLocaleDateString("en-US", options).toUpperCase();
};

export const commentDate = (date: string) => {
  const currentDate = Date.now();
  const epochDate = new Date(date).getTime();

  const timeElapsed = currentDate - epochDate;

  const secondsElapsed = Math.floor(timeElapsed / 1000);
  if (secondsElapsed < 60) {
    if (secondsElapsed <= 1) {
      return "Now";
    }
    return `${secondsElapsed}s`;
  }
  const minutesElapsed = Math.floor(secondsElapsed / 60);
  if (minutesElapsed < 60) {
    return `${minutesElapsed}m`;
  }
  const hoursElapsed = Math.floor(minutesElapsed / 60);
  if (hoursElapsed < 24) {
    return `${hoursElapsed}h`;
  }
  const daysElapsed = Math.floor(hoursElapsed / 24);
  if (daysElapsed < 8) {
    return `${daysElapsed}d`;
  }
  const weeksElapsed = Math.floor(daysElapsed / 7);
  return `${weeksElapsed}w`;
};

export const messageDate = (date: string) => {
  const currentDate = new Date();
  const targetDate = new Date(date);
  const timeElapsed = currentDate.getTime() - targetDate.getTime();
  const daysElapsed = Math.floor(timeElapsed / 1000 / 60 / 60 / 24);
  const hourMinutes = targetDate.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  const currentDay = currentDate.getDay();
  const targetDay = targetDate.getDay();
  const targetDayString = targetDate.toLocaleDateString([], {
    weekday: "long",
  });
  const fullDate = targetDate.toLocaleDateString([], {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const isYesterday = () => {
    if (currentDay === 0 && targetDay === 6) return true;
    if (currentDay - 1 === targetDay) return true;
    return false;
  };

  // if less than 24h and days of the week match
  if (daysElapsed !== 1 && currentDay === targetDay) {
    return hourMinutes;
  }
  if (daysElapsed < 2 && isYesterday()) {
    return `Yesterday ${hourMinutes}`;
  }
  if (daysElapsed < 7 && currentDay !== targetDay) {
    return `${targetDayString} ${hourMinutes}`;
  }

  return `${fullDate} ${hourMinutes}`;
};

export const hoursElapsed = (previousDate: string, targetDate: string) => {
  const timeElapsed =
    new Date(targetDate).getTime() - new Date(previousDate).getTime();
  return Math.floor(timeElapsed / 1000 / 60 / 60);
};

export const minutesElapsed = (previousDate: string, targetDate: string) => {
  const timeElapsed =
    new Date(targetDate).getTime() - new Date(previousDate).getTime();
  return Math.floor(timeElapsed / 1000 / 60);
};

export const activityTime = (date: string) => {
  const currentDate = Date.now();
  const epochDate = new Date(date).getTime();

  const timeElapsed = currentDate - epochDate;

  const secondsElapsed = Math.floor(timeElapsed / 1000);
  const minutesElapsed = Math.floor(secondsElapsed / 60);
  const hoursElapsed = Math.floor(minutesElapsed / 60);
  const daysElapsed = Math.floor(hoursElapsed / 24);
  if (daysElapsed < 1) return "Today";
  if (daysElapsed < 2) return "Yesterday";
  if (daysElapsed < 3) return "Past Three Days";
  if (daysElapsed < 7) return "This Week";
  if (daysElapsed < 30) return "This Month";
  return "Earlier";
};
