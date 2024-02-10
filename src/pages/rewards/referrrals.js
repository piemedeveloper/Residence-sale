import React from "react";
import _ from "lodash";
import { numberFormatter } from "../../utils/utils";

function Referrrals() {
  const data = [
    { invested: [2500, 4999], reward: 25, reward_for_referred: 25 },
    { invested: [5000, 19999], reward: 100, reward_for_referred: 100 },
    { invested: [20000, 39999], reward: 500, reward_for_referred: 500 },
    { invested: [40000], reward: 1000, reward_for_referred: 1000 },
  ];

  return (
    <div>
      <h2 className="mt-10 text-3xl font-medium main-color">My referrals</h2>
      <div className="px-3 py-5 mt-6 overflow-y-auto text-sm bg-white rounded-xl">
        <table className="w-full rewards">
          <thead>
            <tr>
              <th>
                <p>Referral</p>
              </th>
              <th>
                <p>Status</p>
              </th>
              <th>
                <p>My reward</p>
              </th>
              <th>
                <p>Referral reward</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {_.map(data, (reward, i) => (
              <tr key={i}>
                <td>
                  ${numberFormatter(reward.invested[0])}
                  {reward.invested[1] !== undefined
                    ? " - $" + numberFormatter(reward.invested[1])
                    : "+"}
                </td>
                <td>${numberFormatter(reward.reward)}</td>
                <td>${numberFormatter(reward.reward_for_referred)}</td>
                <td>
                  ${numberFormatter(reward.reward + reward.reward_for_referred)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Referrrals;
