import { NextPage } from "next";
import dynamic from "next/dynamic";
const App = dynamic(() => import("@/App"), { ssr: false });

const Home: NextPage = () => <App />;

export default Home;