const { numberFormatter } = require("../../utils/utils");

exports.recitals = (unit) => [
  "WHEREAS the Company Ventures in development of hotel-style, luxury furnished housing units that are community owned and is the proprietor of Pieme Residences project;",
  `WHEREAS the Investor intends to owning a stake in <b>${unit}</b> of Pieme Residences which shall include the structure and all the furnishing therein (the "<b>Housing Unit</b>") being the subject of this Agreement;`,
  "WHEREAS the Investor is desirous of contributing funds as payment for owning a stake in the Housing Unit;",
  "WHEREAS, the Company is the proprietor of the land on which the Housing Unit is or will be constructed and fully furnished as part of Pieme Residences;",
  `WHEREAS, the Company owns an Accommodation Booking Platform ("<b>PIEME</b>") on which the Housing Unit will be listed, advertised and booked by guests; and`,
  "WHEREAS, the Parties are desirous of sharing the Revenue generated from booking the Housing Unit.",
];

exports.purpose = ({ name, amount, percentage }) => [
  {
    menu: "Purpose of the Agreement",
    description: [],
    sub_menu: [
      {
        title: "Definitions",
        description: [
          `<b>Company Project Manager</b> Mr. Muhindo Mutegeki John.`,
          `<b>Land:</b> Land in the ownership of the Company on which the Housing Unit is or will be constructed.`,
          `<b>Pieme Platform:</b> an accommodation booking platform owned by the Company.`,
          `<b>Stake:</b> Percentage of ownership in the Housing Unit held by the Investor.`,
          `<b>Utility Bills:</b> Include electricity, water and sewage, gas cylinder and internet bills.`,
        ],
      },
      {
        title: "",
        description: [
          `This agreement is purposed to record the understandings and undertakings of the Parties herein by which, the Investor will contribute funds in exchange for a stake in the Housing Unit, the Company has contributed land on which the Housing Unit is or will be constructed, the Company will have the Housing Unit managed, listed, advertised and booked through Pieme platform and the revenue generated from the sub-project will be shared between the parties (the "<b>Sub-Project</b>").`,
        ],
      },
    ],
  },

  {
    menu: "Sub-Project Management and Control",
    description: [],
    sub_menu: [
      {
        title: "",
        description: [
          `The Company, through the Company Project Manager will act as the lead developer and determinant of the standard required of the Housing Unit and furnishings therein and coordinate and supervise the activities and the sday-to-day implementation of the development process of the Sub-Project including construction, on behalf of the Parties for purposes of ensuring that the required standard of the Housing Unit is achieved.`,
        ],
      },
      {
        title: "",
        description: [
          `The Company shall be responsible for listing the Housing Unit on PIEME platform for purpose of making it available for booking by guests.`,
        ],
      },
      {
        title: "",
        description: [
          `The Investor shall have a personal electronic account as will be allocated to the Investor for purpose of monitoring the booking status of each booking of the Housing Unit, booking fee paid and also receive their share of revenue earned from booking the Housing Unit as will be agreed in this Agreement.`,
        ],
      },
    ],
  },

  {
    menu: "Funding, Costs and Benefit of Sub-Project",
    description: [],
    sub_menu: [
      {
        title: "",
        description: [
          `The Investor hereby contributes in full <b>${numberFormatter(
            amount
          )}</b> US DOLLARS for <b>${percentage} Percent (%)</b> ownership in the Housing Unit which contribution is inclusive of the cost of furnishing the Housing Unit.`,
        ],
      },
      {
        title: "",
        description: [
          `Each Party shall bear its own direct and indirect costs and expenses to be incurred in connection with the performance of such Party's obligations under the Agreement.`,
        ],
      },
    ],
  },
  {
    menu: "Revenue Distribution",
    description: ["The Parties hereby agree that;"],
    sub_menu: [
      {
        title: "",
        description: [
          `All investors of the Housing Unit shall be jointly entitled to Seventy percent (70%) of the net booking fee from each booking of the Housing Unit out of which the Investor under this agreement shall be entitled to <b>${(
            percentage * 0.7
          ).toFixed(
            2
          )} percent (%) of the net booking fee per booking of the Housing Unit</b> given to the investors.`,
        ],
      },
      {
        title: "",
        description: [
          `The Company shall be entitled to <b>Thirty percent (30%) of the net booking fee per booking of the Housing Unit.</b>`,
        ],
      },
    ],
  },
  {
    menu: "Booking Fee",
    description: [
      "The parties agree that the booking fee for the Housing Unit shall be determined by the Company.",
    ],
    sub_menu: [],
  },

  {
    menu: "Utility Bills, Repairs and maintenance",
    description: ["The Parties hereby agree that;"],
    sub_menu: [
      {
        title: "",
        description: [
          `The Company Undertakes, on behalf of the Parties to pay Utility Bills and perform any repairs and maintenance in respect of the Housing Unit and the Investor agree to a seven percent (7) deduction off every booking fee per booking paid for the Housing Unit to cover the cost of the said Utility Bills, repairs and general maintenance of the Housing Unit.`,
        ],
      },
      {
        title: "",
        description: [
          `The Utility Bills referred to under this agreement include electricity, water and sewage, gas cylinder and internet bills.`,
        ],
      },
      {
        title: "",
        description: [
          `Repairs and maintenance referred to under this agreement include HVAC and air conditioning repairs and inspection, groundskeeping, appliance repair, cleaning, security, pest control, plumbing maintenance and solving electrical issues.`,
        ],
      },
      {
        title: "",
        description: [
          `The Parties undertake to come to a consensus on provision of additional funds or adjusting the percentage for Utility Bills, repairs and maintenance stated under this clause, for bills/costs that may arise unforeseen by the parties at the time of making this agreement or beyond their reasonable control or increase in price for the services or goods necessary for repairs and maintenance.`,
        ],
      },
    ],
  },

  {
    menu: "Warranties",
    description: [],
    sub_menu: [
      {
        title: "",
        description: [
          `The Parties warrant that they have the necessary power and approval to enter into this Agreement.`,
        ],
      },
      {
        title: "",
        description: [
          `The Parties warrant that they are not aware of anything in their reasonable control which will or could have an adverse effect upon their ability to perform their respective obligations under this Agreement.`,
        ],
      },
      {
        title: "",
        description: [
          `The Company warrants to use the funds provided by the investor in their entirety for the purpose for which they are provided subject to this Agreement and not for any other purpose.`,
        ],
      },
      {
        title: "",
        description: [
          `The Company undertakes to distribute to the Investor their share of Revenue earned from the booking of the Housing Unit through PIEME platform, subject to this Agreement.`,
        ],
      },
      {
        title: "",
        description: [
          `The Parties undertakes to only hold and use the Housing Unit for the purpose specified in this agreement and perform their obligations under this Agreement.`,
        ],
      },
      {
        title: "",
        description: [
          `The Investor warrant that not to deal with any other company, individual or entity that is in direct or indirect competition with the business of the Company.`,
        ],
      },
      {
        title: "",
        description: [
          `The Parties warrant that they will not derive any economic benefit from the Housing Unit except as provided under this agreement.`,
        ],
      },
      {
        title: "",
        description: [
          `The Investor warrant not to use the Housing Unit as their personal or family residence or residence of any person except where the investor, family or such person books and pays for the Housing Unit through PIEME platform.`,
        ],
      },
      {
        title: "",
        description: [
          `The Parties warrant that they will not do anything to hinder or adversely affect the performance of the other Party’s duties under the agreement.`,
        ],
      },
      {
        title: "",
        description: [
          `The failure or delay by either Party to enforce any term of this agreement or to act upon a breach of any term shall not constitute a waiver of their rights.`,
        ],
      },
    ],
  },

  {
    menu: "Confidentiality",
    description: [
      "All confidential information shall be held by each Party in strict confidence and shall not be disclosed to any third party, except as may be reasonably required by such Party for the performance and fulfillment of its obligations under the Agreement.",
    ],
    sub_menu: [],
  },
  {
    menu: "Indemnification",
    description: [
      "Each Party to this Agreement shall indemnify, defend and hold harmless the other Party and the Project with respect to any and all claims made against any of them by any person claiming any interest, entitlement, fees, or costs related to the Agreement, Pieme project and Sub-Project or through such Party.",
    ],
    sub_menu: [],
  },
  {
    menu: "Assignment",
    description: [
      "No Party may sell, assign or otherwise transfer, voluntarily or by operation of law, any part of its rights under the Agreement or the Sub-Project, except with consent of all Parties.",
    ],
    sub_menu: [],
  },
  {
    menu: "Duration",
    description: [
      `This Agreement shall commence on the execution date hereinabove stated and shall stay valid for <b>TWENTY (20) Years</b> or until terminated by mutual written consent of the Parties.`,
    ],
    sub_menu: [],
  },

  {
    menu: "Renewal",
    description: [],
    sub_menu: [
      {
        description: [
          `Where this Agreement ends after Twenty (20) years stated under clause 11, the Parties undertake to negotiate and enter into an agreement of renewal valid for Five (5) years on such terms as the Parties will deem fit.`,
        ],
      },
      {
        description: [
          `The Investor will be required to deliver to the Company a notice of interest of renewal not less than Six (6) months before the expiry of this agreement after which the parties will make arrangements for signing an agreement of renewal`,
        ],
      },
      {
        description: [
          `The period extended under Clause 12.1 will commence on the date of signing the agreement of renewal upon payment by the Investor of a renewal amount that will be negotiated between 1%-40% of the average annual income earned from the Housing Unit for twenty years.`,
        ],
      },
    ],
  },
  {
    menu: "Variation",
    description: [
      "Any variation to this Agreement shall be valid only if made in writing and signed by both parties.",
    ],
    sub_menu: [],
  },
  {
    menu: "Notices",
    description: [
      "Any notice served under this Agreement shall be made in writing and shall be considered served if delivered to their email address as provided at the time of registration on the platform from which this agreement was accessed or any other such address as the party being served may have notified as their address for service.",
    ],
    sub_menu: [],
  },
  {
    menu: "Force Majeure",
    description: [],
    sub_menu: [
      {
        description: [
          `Neither party will be liable for any failure or delay in performing any obligation in this Agreement that is due to any of the following causes (which causes are hereinafter referred to as “Force Majeure”), to the extent beyond its reasonable control; acts of God, accident, riots, war, terrorist act, epidemic, pandemic, quarantine, civil commotion, breakdown of communication facilities, breakdown of web hosts, breakdown of internet service provider, natural catastrophes, governmental act or omissions, changes in law or regulations, national strikes, fire, explosion, or generalized lack of availability of raw materials or energy.`,
        ],
      },
      {
        description: [
          `For the avoidance of doubt, force majeure shall not include a party's financial inability to perform its obligations hereunder.`,
        ],
      },
    ],
  },
  {
    menu: "Governing Law and Disputes",
    description: [],
    sub_menu: [
      {
        description: [
          `This agreement and any dispute or claim arising out of or in connection with it or its subject matter (including non-contractual disputes or claims) shall be governed by and construed in accordance with the law of Uganda.`,
        ],
      },
      {
        description: [
          `The parties shall attempt to resolve any dispute arising out of or relating to this Agreement through an agreed Alternative Dispute Resolution (ADR) procedure before resorting to the Courts of law.`,
        ],
      },
    ],
  },
  {
    menu: "Investor's Next of Kin and Beneficiary",
    description: [
      `I <b>${name}</b> hereby designate the person named hereunder as my Next of Kin and at my death, I transfer my rights and Interests under this agreement and such other agreements entered into in fulfillment of my obligations under this agreement to the person named hereunder as my beneficiary who shall also be bound by this agreement.`,
    ],
    sub_menu: [],
  },
];
