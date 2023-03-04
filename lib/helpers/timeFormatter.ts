import moment from "moment";

const timeFormatter = (time: string) => {
  return moment.unix(+time / 1000).format("hh:mm A");
};

export default timeFormatter;
