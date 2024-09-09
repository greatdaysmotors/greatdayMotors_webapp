import { MdOutlinePhoneInTalk } from "react-icons/md";

const SupportCard = ({
  icon: Icon = MdOutlinePhoneInTalk,
  title = "Call Customer Support",
  phoneNumber = "09036600374",
  cardStyles = {},
  iconStyles = {},
  titleStyles = {},
  phoneNumberStyles = {},
  onClick,
}: {
  icon?: React.ComponentType<{ size: number; color: string }>;
  title?: string;
  phoneNumber?: string;
  cardStyles?: React.CSSProperties;
  iconStyles?: React.CSSProperties;
  titleStyles?: React.CSSProperties;
  phoneNumberStyles?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div
      style={{
        boxShadow: "0px 0px 10px 0px rgba(34, 34, 34, 0.3)",
        ...cardStyles,
      }}
      className="mt-[2.4rem] p-[2.4rem] rounded-[1rem] flex items-start justify-start md:w-[35rem] md:mx-auto gap-[0.8rem] cursor-pointer"
      onClick={onClick} // Ensure this is a valid function or undefined
    >
      <div
        className="p-4 rounded-full flex justify-center items-center bg-[#2F2FC830]"
        style={iconStyles}
      >
        <Icon size={24} color="#2F2FC8" />
      </div>
      <div>
        <h5
          className="text-[1.4rem] md:text-[1.6rem] font-[600]"
          style={titleStyles}
        >
          {title}
        </h5>
        <h5
          className="text-[1.4rem] md:text-[1.6rem] font-[500]"
          style={phoneNumberStyles}
        >
          {phoneNumber}
        </h5>
      </div>
    </div>
  );
};

export default SupportCard;
