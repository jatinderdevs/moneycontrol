import { PuffLoader } from "react-spinners";

const Loader = ({ loading }) => {
  return (
    <PuffLoader
      color="blue"
      loading={loading}
      css={`
        display: block;
        margin: 0 auto;
        border-color: red;
      `}
      size={100}
    />
  );
};

export default Loader;
