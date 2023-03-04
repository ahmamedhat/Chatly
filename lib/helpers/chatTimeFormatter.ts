import moment from "moment";

const chatTimeFormatter = (time: string) => {
  return moment.unix(+time / 1000).fromNow();
};

export default chatTimeFormatter;
