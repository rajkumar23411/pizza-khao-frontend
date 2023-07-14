import React from "react";

const OrderTableData = () => {
  const [isFocused, setIsFocused] = React.useState(false);
  const handleRotate = () => {
    setIsFocused(!isFocused);
  };
  React.useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target.tagName !== "SELECT") {
        setIsFocused(false);
      }
    });
  }, []);
  return (
    <div className="flex justify-between py-3 border border-gray-300">
      <div className="flex-1 text-center font-roboto font-medium grid items-center">
        od377646362921djsgt37
      </div>
      <div className="flex-1 text-center font-roboto font-medium grid items-center">
        <div className="flex items-center justify-center">
          <span>Pizza</span> - <span>1</span>
        </div>
      </div>
      <div className="flex-1 text-center font-roboto grid items-center">
        John Doe
      </div>
      <div className="flex-1 text-center font-roboto grid items-center">
        ₹400.78
      </div>
      <div className="flex-1 text-center font-roboto text-green-600 font-medium grid items-center">
        Paid
      </div>
      <div className="flex-1 text-center font-roboto text-red-600 font-medium grid items-center">
        Placed
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="border-2 bg-gray-100 rounded overflow-hidden h-10 w-3/4 relative cursor-pointer">
          <select
            className="appearance-none bg-transparent focus:border focus:border-sky-300 font-roboto w-full h-full px-2 cursor-pointer text-gray-700"
            onClick={handleRotate}
          >
            <option value="1">Placed</option>
            <option value="2">Processing</option>
            <option value="3">Beaking</option>
            <option value="3">Out of delivery</option>
          </select>
          <i
            className={`far fa-angle-down absolute text-xl right-2 top-1 text-gray-400 ${
              isFocused && "rotate-180"
            }`}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default OrderTableData;
