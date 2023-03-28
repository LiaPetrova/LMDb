export const timeAgoHandler = (value) => {
    const now = new Date();
    const then = new Date(value.toDate());

    const timePassed = now.getTime() - then.getTime();
    const miliseconds = 1000;
    const second = miliseconds;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;

    if(timePassed < minute) {
      if(timePassed/second < 2)  {
      return `${Math.floor(timePassed / second)} second ago`;
      } else {
        return `${Math.floor(timePassed / second)} seconds ago`;
      }
    }

    if(timePassed < hour) {
      if(timePassed / minute < 2) {
        return `${Math.floor(timePassed / minute)} minute ago`;
      } else {
        return `${Math.floor(timePassed / minute)} minutes ago`;
      }
    }

    if(timePassed < day) {
      if(timePassed / hour < 2) {
        return `${Math.floor(timePassed / hour)} hour ago`;
      } else {
        return `${Math.floor(timePassed / hour)} hours ago`;
      }    
    }

    if(timePassed < month) {
      if(timePassed / day < 2) {
        return `${Math.floor(timePassed / day)} day ago`;
      } else {
        return `${Math.floor(timePassed / day)} days ago`;
      }
    }

    if(timePassed < year) {
      if(timePassed / month < 2) {
        return `${Math.floor(timePassed / month)} month ago`;
      } else {
        return `${Math.floor(timePassed / month)} months ago`;
      }
    }

    if(timePassed / year < 2) {
      return `${Math.floor(timePassed / year)} year ago`;
    } else {
      return `${Math.floor(timePassed / year)} years ago`;
    }
  
}