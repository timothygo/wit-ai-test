import "../src/styles/reset.scss";
import SocketProvider from "../src/states/SocketProvider";
import MicProvider from "quick-utility/MicProvider";

function MyApp({ Component, pageProps }) {
  return (
    <MicProvider>
      <SocketProvider>
        <Component {...pageProps} />
      </SocketProvider>
    </MicProvider>
  );
}

export default MyApp;
