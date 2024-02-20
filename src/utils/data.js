const textSignature = require("text-signature");

exports.properties = [
  {
    period: 20,
    image: require("../assets/images/kampala.jpg"),
    country: "Uganda",
    location: "Kampala",
    slag: "kampala",
    investors: 29,
    price: 1100000,
    paid: 800000,
    annual_yield: 30,
    type: 0,
    modification_datetime: new Date(),
    why: "",
  },
  {
    period: 20,
    image: require("../assets/images/jinja.jpeg"),
    country: "Uganda",
    location: "Jinja",
    slag: "jinja",
    investors: 0,
    price: 1750000,
    paid: 0,
    annual_yield: 35,
    type: 1,
    modification_datetime: new Date(),
  },

  {
    period: 20,
    image: require("../assets/images/mombasa.jpg"),
    country: "Kenya",
    location: "Mombasa",
    slag: "mombasa",
    investors: 0,
    price: 2250000,
    paid: 0,
    annual_yield: 35,
    type: 1,
    modification_datetime: new Date(),
  },

  {
    period: 20,
    image: require("../assets/images/zanzibar.jpg"),
    country: "Zanzibar",
    location: "Zanzibar",
    slag: "zanzibar",
    investors: 0,
    price: 2250000,
    paid: 0,
    annual_yield: 35,
    type: 1,
    modification_datetime: new Date(),
  },
];

exports.how_it_works = [
  {
    title: "What is Hotel Community ownership?",
    slag: "what-is-hotel-community-ownership",
    photo: require("../assets/images/community-ownership.jpg"),
    desc: `<div><p>Hotel Community Ownership refers to a unique concept where a community collectively owns or invests in a hotel property. Instead of traditional ownership models where a single entity or a group of investors own the entire hotel, community ownership involves a broader group of individuals or stakeholders who own independent hotel rooms, and share ownership rights and responsibilities.</p><br /><p>In a hotel community ownership model:</p><br /><ol style="list-style-type: lower-alpha"><li>  <b> Shared Ownership: </b>Multiple individuals or entities contribute funds to collectively own the hotel. This can include residents, businesses, and even visitors who want to invest in and have a stake in the hotel.  </b></li><li>  <b>Participatory Decision-Making: </b>Community members may have a  say in the decision-making processes related to the hotel. This  could include input on management decisions, operational  strategies, and community engagement initiatives.</li><li>  <b>Local Engagement: </b>Community-owned hotels often prioritize  local engagement and benefit the surrounding community. Profits  generated by the hotel can be reinvested locally, supporting  economic development and community projects.</li><li>  <b>Sustainability: </b>Community-owned hotels may have a stronger  focus on sustainability and responsible business practices,  aligning with the values and priorities of the community members.</li><li>  <b>Shared Benefits: </b>Profits from the hotel are distributed  among the community stakeholders, fostering a sense of shared  prosperity and encouraging active involvement in the success of  the enterprise.</li>   </ol>   <p>Overall, hotel community ownership aims to create a more inclusiveand collaborative approach to hotel management, where the interestsof the community are integral to the success and sustainability ofthe business.   </p></div>`,
  },
  {
    title: "Community vs Traditional Hotel Ownership",
    slag: "community-vs-traditional-hotel-ownership",
    photo: require("../assets/images/comvs.png"),
    desc: "<p>A Community-Owned Hotel involves diverse local stakeholders collectively owning and making decisions for the hotel, fostering community engagement and reinvesting profits locally. In contrast, traditional ownership models are typically centralized, owned by a single entity or investor group, with decision-making and benefits focused on profitability rather than community involvement. Community-owned hotels prioritize sustainability, aligning with local values, while profits are shared among stakeholders. Traditional models may lack this emphasis on community-driven values and shared prosperity, making the community-owned approach a more inclusive and locally focused alternative.</p>",
  },
  {
    title: "How do Pieme residences work",
    slag: "how-do-pieme-residences-work",
    photo: require("../assets/images/how-they-work.jpg"),
    desc: "<div><p>Pieme Residences, a pioneering initiative by Pie Tech Limited, operates as community-owned hotel apartments leveraging Blockchain technology. The process begins with meticulous location research, land acquisition, and an open invitation for individuals to invest in and own specific hotel units (Rooms). Investors become stakeholders in the project, benefiting from shared profits.</p><br /><p>Pieme Residences takes charge of comprehensive management, marketing, and maintenance, providing a hassle-free experience for the investing community. The groundbreaking aspect lies in investors receiving up to 70% of the booking fee for each night their unit (room) is booked. This hands-free approach allows the community to passively enjoy daily earnings without direct involvement.</p><br /><p>The utilization of Blockchain ensures transparency, secure ownership records, and smart contract functionalities, enhancing trust in the investment process. Pieme Residences thus redefines community-owned hotel room, offering a seamless and profitable experience for investors who contribute to and partake in the success of this innovative venture.</p></div>",
  },
  {
    title: "What are the advantages of investing in Pieme Residences",
    slag: "what-are-the-advantages-of-investing-in-pieme-residences",
    photo: require("../assets/images/global_expansion.webp"),
    desc: "<div><p>Investing in Pieme Residences offers several advantages, emphasizing ease of expansion into other countries and the diversification of capital across various residences:</p><br /><p><b>Global Expansion Easy:</b></p><p>Investing in hotel room globally poses significant challenges for individual investors, such as navigating foreign regulations, cultural nuances, and substantial capital requirements. Pieme Residences, utilizing Blockchain, transforms this arduous process. Instead of grappling with the complexities of entering new markets, investors effortlessly diversify holdings across different countries within Pieme's expanding network. By acquiring units in locations like Mombasa, Zanzibar, Kigali, and Dar es Salaam among other countries Pieme will expand to, the platform provides a simplified avenue for international hotel room investment, sparing investors the intricate and time-consuming hurdles associated with solo ventures in unfamiliar territories.</p><br /><p><b>Diversification of Capital:</b></p><p>Investors can spread their capital across different residences by owning specific hotel units in various locations. This diversification minimizes risk and exposure to fluctuations in a single market, enhancing the resilience of the investment portfolio. </p><br /><p><b>Stable Income Stream:</b></p><p>The profit-sharing model, where investors receive up to 70% of the booking fee per night, ensures a stable and ongoing income stream. This steady return on investment contributes to the financial stability of investors.</p><br /><p><b>Passive Income and Hands-Free Management:</b></p><p>Pieme Residences offers a hands-free investment model, allowing investors to enjoy daily earnings without actively managing the residences. This passive income approach suits individuals seeking low-maintenance yet profitable hotel room investments. </p><br /><p><b>Transparent and Secure Transactions:</b></p><p>The use of Blockchain technology ensures transparent and secure transactions. Smart contracts on the Blockchain enhance trust and transparency, providing a reliable and efficient investment environment. </p><br /><p><b>Community Ownership Benefits:</b></p><p>As part of a community-owned model, investors benefit from collective decision-making and shared prosperity. The community-driven approach fosters a sense of involvement and shared success among stakeholders. </p><br /><p><b>Flexibility and Liquidity:</b></p><p>Owning specific units in different residences offers flexibility in adjusting investment strategies. Additionally, Blockchain technology can potentially provide liquidity options through tokenization, allowing investors to trade their ownership stakes.</p><br /><p><b>Professional Management:</b></p><p>Pieme Residences handles all aspects of management, marketing, and maintenance. Investors can rely on the expertise of the company to efficiently manage the business, reducing the burden on individual investors.</p></div>",
  },

  {
    title: "“I can afford to build an entire hotel alone”",
    slag: "i-can-afford-to-build-an-entire-hotel-alone",
    photo: require("../assets/images/afford.jpeg"),
    desc: `<div><p>Having the financial capacity to independently build a hotel is commendable, however, investing in Pieme Residences offers unique advantages, including risk diversification. Unlike owning a hotel in one location and country, which concentrates risk, Pieme Residences allows investors to spread their capital across multiple residences and projects to be built across Africa. This diversification minimizes the impact of potential issues in a single location, offering a more resilient and secure investment strategy. The community-owned model, managed by Pie Tech Limited, fosters shared decision-making, providing investors with up to 70% of nightly booking fees. This hands-free approach ensures passive income without the operational responsibilities of independent hotel ownership. With strategic location selection, blockchain technology integration, and an innovative investment concept, Pieme Residences stands as a modern, collaborative, and risk-mitigating approach to hotel room and hotel investment.</p><br /><p>More so, while it's expensive and challenging to rapidly expand hotels and general investments across different countries independently, Pieme Residences provides a seamless avenue for investors to diversify across the African continent easily. Unlike the tedious process of individually visiting countries, dealing with paperwork, and obtaining work permits, investing in Pieme Residences allows for effortless expansion. Investors can own hotel rooms in various cities like Mombasa, Dar es Salaam, Kigali, and other countries where Pieme Residences will be established. The investor doesn't need to navigate the complexities of international bureaucracy; a simple investment in Pieme Residences to be established in those countries is all it takes to start. This ease of expansion, combined with the benefits of a community-owned model and profit-sharing, positions Pieme Residences as a convenient and lucrative investment opportunity across diverse African locations.</p></div>`,
  },
  {
    title: "Disadvantages of investing in community-owned Hotels",
    slag: "disadvantages-of-investing-in-community-owned-hotels",
    photo: require("../assets/images/investing.jpg"),
    desc: "<p>Community-owned hotels may pose challenges such as complex decision-making processes, potential disagreements among stakeholders, and limited control for individual investors. Profit distribution might be subject to community agreements, impacting personal returns. Additionally, community projects may face slower decision implementation, and conflicts could arise due to differing investor priorities and expectations.</p>",
  },
];

exports.low_investment = "$150";

exports.text_to_signature = (text) => {
  var optionsParameter = {
    width: 800,
    height: 300,
    paddingX: 100,
    paddingY: 200,
    canvasTargetDom: ".js-canvasTargetDom",
    font: ["100px", "'Homemade Apple'"],
    color: "black",
    textString: text,
    customFont: {
      name: "'Homemade Apple'",
      url: "http://fonts.googleapis.com/css?family=Homemade+Apple",
    },
  };

  const sig = new textSignature(optionsParameter);
  sig.generateImage(optionsParameter);
  return sig.getImageData();
};
