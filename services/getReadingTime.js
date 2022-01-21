const READING_SPEED = 120;

export const getReadingTime = (str) => {
  str = str.replace(/(^\s*)|(\s*$)/gi, "");
  str = str.replace(/[ ]{2,}/gi, " ");
  str = str.replace(/\n /, "\n");
  return Math.ceil(str.split(" ").length / READING_SPEED);
};
