import { FunctionComponent } from "react";
import { DatePicker } from "antd";

interface Props {}

const Home: FunctionComponent<Props> = () => (
  <div>
    <p>Hello World!</p>
    <DatePicker></DatePicker>
  </div>
);

export default Home;
