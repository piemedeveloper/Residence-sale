import React from "react";

import { Collapse } from "antd";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import {
  FaqIndex1,
  FaqIndex2,
  FaqIndex3,
  FaqIndex4,
  FaqIndex5,
  FaqIndex6,
  FaqIndex7,
  FaqIndex8,
  FaqIndex9,
  FaqIndex10,
  FaqIndex11,
  FaqIndex12,
  FaqIndex13,
  FaqIndex14,
  FaqIndex15,
  FaqIndex16,
  FaqIndex17,
  FaqIndex18,
  FaqIndex19,
  FaqIndex20,
  FaqIndex21,
  FaqIndex22,
  FaqIndex23,
  FaqIndex24,
  FaqIndex25,
  FaqIndex26,
  FaqIndex27,
  FaqIndex28,
  FaqIndex29,
  FaqIndex30,
  FaqIndex31,
  FaqIndex32,
  FaqIndex33,
  FaqIndex34,
  FaqIndex35,
  FaqIndex36,
  FaqIndex37,
} from "./data-content";
function FaqData() {



  const items = [
    {
      key: "1",
      label:
        "1. What is Pieme Residences, and what differentiates it from other investment opportunities?",
      children: <FaqIndex1 />,
    },
    {
      key: "2",
      label: "2. How does Pieme Residences incorporate blockchain technology into its model?",
      children: <FaqIndex2 />,
    },
    {
      key: "3",
      label:
        "3. Is Pieme Residences a completely new concept, or are there similar projects globally?",
      children: <FaqIndex3 />,
    },
    {
      key: "4",
      label:
        "4. What problem does Pieme Residences solve in the real estate or hospitality industry?",
      children: <FaqIndex4 />,
    },
    {
      key: "5",
      label: "5. How many units have been built so far and how many are currently available for investment?",
      children: <FaqIndex5 />,
    },
    {
      key: "6",
      label: "6. What is the minimum and maximum investment amount for Pieme Residences?",
      children: <FaqIndex6 />,
    },
    {
      key: "7",
      label: "7. What is the expected return on investment (ROI)?",
      children: <FaqIndex7 />,
    },
    {
      key: "8",
      label: "8. How often will investors receive dividends or profits?",
      children: <FaqIndex8 />,
    },
    {
      key: "9",
      label: "9. Are there any guarantees on the profitability of the investment?",
      children: <FaqIndex9 />,
    },
    {
      key: "10",
      label: "10. How is the revenue from the hotel rooms distributed among investors?",
      children: <FaqIndex10 />,
    },
    {
      key: "11",
      label: "11. What is the total cost of one unit, and what does it include?",
      children: <FaqIndex11 />,
    },
    {
      key: "12",
      label: "12. Can I invest using cryptocurrency? If so, which ones are accepted?",
      children: <FaqIndex12 />,
    },
    {
      key: "13",
      label: "13. What fees are associated with investing in Pieme Residences?",
      children: <FaqIndex13 />,
    },
    {
      key: "14",
      label: "14. What happens if the hotel doesn’t generate enough revenue?",
      children: <FaqIndex14 />,
    },
    {
      key: "15",
      label: "15. Are there tax implications for investing in Pieme Residences?",
      children: <FaqIndex15 />,
    },
    {
      key: "16",
      label: "16. Where is Pieme Residences located, and are there plans for expansion to other regions?",
      children: <FaqIndex16 />,
    },
    {
      key: "17",
      label: "17. What amenities are included in each unit?",
      children: <FaqIndex17 />,
    },
    {
      key: "18",
      label: "18. How are the units maintained, and who is responsible for maintenance costs?",
      children: <FaqIndex18 />,
    },
    {
      key: "19",
      label: "19. What is the size and layout of the units available for investment?",
      children: <FaqIndex19 />,
    },
    {
      key: "20",
      label: "20. Are the units furnished or unfurnished?",
      children: <FaqIndex20 />,
    },
    {
      key: "21",
      label: "21. Who handles the management and operations of the hotel?",
      children: <FaqIndex21 />,
    },
    {
      key: "22",
      label: "22. How will the bookings be managed for the hotel rooms?",
      children: <FaqIndex22 />,
    },
    {
      key: "23",
      label: "23. Is there a system for tracking the performance of my investment?",
      children: <FaqIndex23 />,
    },
    {
      key: "24",
      label: "24. Who is responsible for marketing the hotel rooms to travelers?",
      children: <FaqIndex24 />,
    },
    {
      key: "25",
      label: "25. What is the occupancy rate forecast for Pieme Residences?",
      children: <FaqIndex25 />,
    },
    {
      key: "26",
      label: "26. What risks are associated with investing in Pieme Residences?",
      children: <FaqIndex26 />,
    },
    {
      key: "27",
      label: "27. Is ownership in the project documented?",
      children: <FaqIndex27 />,
    },
    {
      key: "28",
      label: "28. Are there regulatory approvals for this project in the country where it operates?",
      children: <FaqIndex28 />,
    },
    {
      key: "29",
      label: "29. How does Pieme Residences contribute to the local community?",
      children: <FaqIndex29 />,
    },
    {
      key: "30",
      label: "30. Will Pieme Residences provide employment opportunities for locals?",
      children: <FaqIndex30 />,
    },
    {
      key: "31",
      label: "31. Are there any programs to support local businesses, like sourcing furniture or decor?",
      children: <FaqIndex31 />,
    },
    {
      key: "32",
      label: "32. What is the long-term vision for Pieme Residences?",
      children: <FaqIndex32 />,
    },
    {
      key: "33",
      label: "33. Are there plans to introduce new locations for Pieme Residences?",
      children: <FaqIndex33 />,
    },
    {
      key: "34",
      label: "34. What kind of support will investors receive post-investment?",
      children: <FaqIndex34 />,
    },
    {
      key: "35",
      label: "35. How can investors sell or transfer their ownership if they wish to exit?",
      children: <FaqIndex35 />,
    },
    {
      key: "36",
      label: "36. Are there opportunities for reinvesting profits into new Pieme Residences projects?",
      children: <FaqIndex36 />,
    },
    {
      key: "37",
      label: "37. Attractive Returns Scenario",
      children: <FaqIndex37 />,
    },
  ];

  return (
    <div className="pb-10 gray-bg">
      <div className="container mx-auto">
        <h1 className="pt-10 pb-6 text-5xl font-medium text-center heading-color">
          Frequently asked questions
        </h1>


        <div className="max-w-5xl mx-auto">
          <Collapse
            accordion
            items={items}
            defaultActiveKey={["1"]}
            expandIconPosition="end"
            bordered={false}
          />
        </div>

      </div>
    </div>
  );
}

export default FaqData;
