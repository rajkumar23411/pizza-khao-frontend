import React from "react";

const ReportBox = ({ title, icon, data }) => {
  const [count, setCount] = React.useState(0);
  const interval = 1000;
  const duration = Math.floor(parseInt(interval / data));

  React.useEffect(() => {
    let startVal = 0;
    let increment = data > 1000 ? 10 : 1;
    const timer = setInterval(() => {
      startVal += increment;
      if (startVal <= data) setCount(startVal);
      else clearInterval(timer);
    }, duration);
    return () => clearInterval(timer);
  }, [data, duration]);
  return (
    <div className="h-40 w-44 bg-white rounded-xl shadow-lg shadow-slate-200 p-6">
      <div className="flex justify-between flex-col h-full w-full">
        <i className={`${icon} text-2xl`}></i>
        <div>
          <p className="text-xl font-medium text-gray-900">
            {Math.floor(count)}
          </p>
          <p className="text-gray-400 text-base font-sans">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default ReportBox;
