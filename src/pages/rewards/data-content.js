import _ from "lodash";
import React from "react";
import { numberFormatter } from "../../utils/utils";

export function Referrers() {
  return (
    <div className="px-6">
      <ol style={{ listStyleType: "decimal" }}>
        <li>
          This offer is open to existing Pieme users who:
          <ul style={{ listStyleType: "circle" }} className="text-base ms-3">
            <li>have an existing account with us</li>
            <li>
              are acting in their private capacity and not participating in a
              referral scheme for any business purpose (unless an appropriate
              introducer agreement is in place to ensure the correct systems and
              controls); and
            </li>
            <li>
              have completed the appropriate KYC/AML process on the website.
            </li>
          </ul>
        </li>

        <li>
          For each referral made, only one referral reward per person/entity
          applies.
        </li>
        <li>
          You are required to provide your friend / referee with your unique
          referral code.
        </li>
        <li>
          If more than one referrer introduces the same referee to us, any
          referral reward will be given to the referrer whose referral code was
          used by the referee when they signed up with us.
        </li>
        <li>
          The referral reward shall be split 50/50 between the referrer and
          referral.
        </li>
        <li>
          The referrer's portion of the referral reward (if applicable) will be
          credited into the property, which is being funded at the time, after a
          Binding Terms sheet has been sent to and signed by the referrer,
          within one month of the referral having deployed a minimum of $2,500
          into residences on the Pieme Platform
        </li>
        <li>
          The referral reward will be issued in the same currency that the
          referred investment is made in. For example, on an investment into a
          property listed in €, Pieme will offer a reward of €50 instead of $50.
        </li>
      </ol>
    </div>
  );
}

export function FriendReferrer() {
  return (
    <div className="px-6">
      <ol style={{ listStyleType: "decimal" }}>
        <li>
          To be eligible to participate in any referral scheme, referrals must:
          <ul style={{ listStyleType: "circle" }} className="text-base ms-3">
            <li>
              not have an existing account with us at the date that they are
              referred to us;
            </li>
            <li>not be the same person/entity as the referrer;</li>
            <li>not be the wife/husband/civil partner of the referrer;</li>
            <li>
              must comply with the instructions that relate to the relevant
              referral scheme including, but not limited to, setting up an
              account with us during the relevant sign up period using the
              relevant referral code we will supply to referrers;
            </li>
            <li>
              complete all necessary “know your client” and/or anti-money
              laundering checks to open an account with us; and
            </li>
            <li>
              have within a period of 90 days from sign-up to Pieme deployed a
              minimum of $2,500 in residences on the Pieme platform.
            </li>
          </ul>
        </li>

        <li>
          The referral's portion of the referral reward will be added to the
          investment which triggers the bonus, having deployed a minimum of
          $2,500 into residences on the Pieme platform.
        </li>
      </ol>
    </div>
  );
}

export function General() {
  return (
    <div className="px-6">
      <ol style={{ listStyleType: "decimal" }}>
        <li>
          If a promotion is used in conjunction with any other Pieme offers or
          promotions (including other referral schemes or cash back offers
          relating to us), we reserve the right to only allocate the most
          favourable (rather than cumulative) benefit. For the avoidance of
          doubt, there would not be a cumulative benefit in circumstances where
          we offer a promotion relating only to property A and another relating
          only to property B i.e. both would apply and could be taken up,
          including, in conjunction with a referral scheme. In the event of any
          debate as to which terms are most favourable, Pieme shall have
          absolute discretion and its decision shall be final (then consistently
          applied so as to treat customers fairly).
        </li>
        <li>
          All referrals using methods generated by a script, macro or the use of
          automated devices will be void.
        </li>
        <li>
          If you exercise any right to withdraw from an investment and/or if you
          do not act in a bona fide manner or seek to 'game' the promotion or
          referral scheme then you will not be eligible.
        </li>
        <li>
          Where we suspect that the terms of any promotion, referral scheme or
          offer has been breached we reserve the right to reclaim the rebate
          and/or cash back element of such offers and/or set such sum off
          against any funds we hold on the relevant customer's behalf.
        </li>
        <li>
          We reserve the right to suspend a promotion or referral scheme at any
          time if we believe there may be fraud, money laundering or any other
          illegal activity connected with the relevant account or an issue with
          legality in the jurisdiction in which the customer is based.
        </li>
        <li>
          If any provision of these terms, or any part of a provision of these
          terms, is found to be illegal, invalid or unenforceable the remaining
          provisions, or the remainder of the provision concerned, shall
          continue in effect.
        </li>
        <li>
          A failure or delay in enforcing compliance with any term of these
          terms shall not be a waiver of that or any other term of these terms.
        </li>
        <li>
          By participating customers generally consent to us processing their
          data as set out in our Privacy Policy and Terms and Conditions.
        </li>
        <li>
          The laws of England shall govern these terms and the parties submit to
          the exclusive jurisdiction of the Courts of England & Wales.
        </li>
        <li>
          We encourage you to check the terms of these terms from time to time
          because we reserve the right to amend/vary the terms and to withdraw
          referral schemes and promotions at any time. Your continued use of our
          services shall constitute your acceptance of any such amendments or
          variations to these terms. Additionally, where we make changes to
          other terms and conditions that relate to our services they shall be
          deemed reflected here.
        </li>
      </ol>
    </div>
  );
}

export function Reward() {
  const data = [
    { invested: [2500, 4999], reward: 25, reward_for_referred: 25 },
    { invested: [5000, 19999], reward: 100, reward_for_referred: 100 },
    { invested: [20000, 39999], reward: 500, reward_for_referred: 500 },
    { invested: [40000], reward: 1000, reward_for_referred: 1000 },
  ];
  return (
    <table className="w-full rewards">
      <thead>
        <tr>
          <th>
            <p>Amount invested by referred member</p>
          </th>
          <th>
            <p>My reward</p>
          </th>
          <th>
            <p>Reward for referred member</p>
          </th>
          <th>
            <p>Total reward</p>
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
  );
}
