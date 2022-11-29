import moment from "moment";

export const dateHumanize = (date) => moment(date).fromNow();