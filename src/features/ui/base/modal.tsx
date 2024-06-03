type ModalProps = {
  children: React.ReactNode;
  bgColor: string;
};

const Modal = ({ children, bgColor }: ModalProps) => {
  return (
    <div className={`z-[80] w-full h-full ${bgColor} fixed top-0 left-0`}>
      {children}
    </div>
  );
};

export default Modal;
