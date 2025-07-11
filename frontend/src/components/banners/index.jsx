import {
  IconCheck,
  IconPlaystationX,
  IconAlertTriangle,
  IconInfoCircle,
} from "@tabler/icons-react";

const variants = {
  success: {
    bg: "bg-green-500",
    icon: <IconCheck size={20} />,
  },
  danger: {
    bg: "bg-red-100 border border-red-600 !text-red-600",
    icon: <IconPlaystationX size={20} />,
  },
  warning: {
    bg: "bg-yellow-500",
    icon: <IconAlertTriangle size={20} />,
  },
  info: {
    bg: "bg-blue-500",
    icon: <IconInfoCircle size={20} />,
  },
};

const  Banner = ({ variant = "info", message, caption = "" }) => {
  const { bg, icon } = variants[variant] || variants.info;

  return (
    <div className={` ${bg} w-fit text-white px-4 py-3 flex items-start gap-3 rounded-[15px] my-3`}>
      <div className="mt-1">{icon}</div>
      <div>
        <div className="text-sm font-medium">{message}</div>
        {caption && <div className="text-xs opacity-90">{caption}</div>}
      </div>
    </div>
  );
}


export default Banner;