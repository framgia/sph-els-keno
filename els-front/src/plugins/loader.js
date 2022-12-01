import { Puff } from "react-loader-spinner";

export const loadingScreenShow = (color = 'grey') => <Puff
  height="100"
  width="100"
  radisu={1}
  color="grey"
  ariaLabel="puff-loading"
  wrapperStyle={{}}
  wrapperClass="loading-screen"
  visible={true}
/>