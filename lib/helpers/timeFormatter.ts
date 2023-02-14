import moment from "moment";

const timeFormatter = (time: string) => {
  const myDate = new Date(time);
  return moment(myDate).format("hh:mm A");
};

export default timeFormatter;
