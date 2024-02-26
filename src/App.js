import "./App.css";
import "./assets/css/document.css";
import Content from "./layout/content";
// import Content from "./layout/content";
import { BrowserRouter } from "react-router-dom";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import { bsc } from "viem/chains";

function App() {
  const projectId = "04f3c387a6d55f5a29fd58b99c63a224";
  const chains = [bsc];
  const wagmiConfig = defaultWagmiConfig({
    chains,
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
  });

  // 3. Create modal
  createWeb3Modal({ wagmiConfig, projectId, chains });
  return (
    <WagmiConfig config={wagmiConfig}>
      <div className="App">
        {/* <Content /> */}
        <BrowserRouter>
          <Content />
        </BrowserRouter>
      </div>
    </WagmiConfig>
  );
}

export default App;
