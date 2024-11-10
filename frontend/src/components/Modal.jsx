import { ImCross } from "react-icons/im";
const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center ml-52 justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="absolute top-[40%] right-[50%] bg-white px-8 py-4 rounded-lg z-10 text-right">
            <button
              className="text-black font-semibold hover:text-gray-700 focus:outline-none mr-2"
              onClick={onClose}
            >
              <ImCross/>
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
