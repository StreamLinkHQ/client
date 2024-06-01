type DropDownProps = {
  children: React.ReactNode;
  styles: string;
};

const DropDown = ({ children, styles }: DropDownProps) => {
  return <div className={styles}>{children}</div>;
};

export default DropDown;
