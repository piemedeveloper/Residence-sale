import React from "react";
import { formatDate, numberFormatter } from "../../utils/utils";
import { FaFilePdf } from "react-icons/fa";
import _, { ceil } from "lodash";

function Transactions({ records }) {
  return (
    <div>
      <h2 className="pb-3 text-lg font-medium text-center">
        My Investment Transactions
      </h2>
      <div className="w-full overflow-x-auto border transactions">
        <table className="w-full bg-white">
          <thead>
            <tr>
              <th>
                <p>Transaction Id</p>
              </th>
              <th>
                <p>Unit</p>
              </th>
              <th>
                <p>Invested ($)</p>
              </th>
              <th>
                <p>Platform Fee ($)</p>
              </th>
              <th>
                <p>Total ($)</p>
              </th>
              <th>
                <p>Phone</p>
              </th>
              <th>
                <p>Status</p>
              </th>

              <th>
                <p>Date</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {_.map(records, (d, i) => (
              <tr key={i}>
                <td>{d.transaction_id}</td>
                <td>{d.unit}</td>
                <td>{numberFormatter(d.amount)}</td>
                <td>{numberFormatter(ceil(d.fee))}</td>
                <td>{numberFormatter(ceil(d.amount + d.fee))}</td>
                <td>{d.phone}</td>
                <td>
                  {d.status === 0 && "Pending"}
                  {d.status === 1 && "Successful"}
                  {d.status === 2 && "Failed"}
                </td>

                <td>{formatDate(d.creation_datetime)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;
