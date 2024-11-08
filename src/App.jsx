import React, { useState } from "react";
import "./index.css";

function App() {
  const [balance, setBalance] = useState(10000); // กำหนดยอดเงินเริ่มต้น
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [history, setHistory] = useState([]);

  const handleWithdraw = (amount) => {
    const withdrawValue =
      typeof amount === "number" ? amount : parseInt(withdrawAmount);
    if (withdrawValue > 0 && withdrawValue <= balance) {
      const newBalance = balance - withdrawValue;
      setBalance(newBalance);
      setHistory([
        { amount: withdrawValue, remainingBalance: newBalance },
        ...history,
      ]);
      setWithdrawAmount("");
    } else {
      alert("ไม่สามารถถอนเงินจนหมดบัญชีได้ จะต้องมีเงินเหลืออย่างน้อย 1 บาท");
    }
  };

  return (
    <div className="App min-h-screen flex justify-center items-center bg-gray-200">
      <div className="flex space-x-10">
        <div className="withdrawal-section border-2 border-500 p-6 rounded-lg bg-gray-100 w-80 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">ระบบถอนเงิน</h2>
          <p className="mb-4">ยอดเงินคงเหลือ: {balance} บาท</p>
          <div className="withdraw-buttons mb-4">
            {[100, 500, 1000, 5000].map((amount) => (
              <button
                key={amount}
                onClick={() => handleWithdraw(amount)}
                className="w-full bg-green-500 text-white py-2 mb-2 rounded-lg hover:bg-green-600"
              >
                ถอน {amount} บาท
              </button>
            ))}
          </div>
          <input
            type="number"
            placeholder="จำนวนเงินที่ต้องการถอน"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          />
          <button
            onClick={() => handleWithdraw()}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            ถอนเงิน
          </button>
        </div>

        <div className="history-section border-2 border-500 p-6 rounded-lg bg-gray-50 w-500 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">ประวัติการถอนเงิน</h2>
          <ul className="list-disc pl-6">
            {history.map((entry, index) => (
              <li key={index} className="mb-2">
                <span>
                  ถอน:{" "}
                  <span className="font-semibold text-green-600">
                    {entry.amount} บาท
                  </span>
                </span>
                <span className="ml-4">
                  คงเหลือ:{" "}
                  <span className="font-semibold text-red-600">
                    {entry.remainingBalance} บาท
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
