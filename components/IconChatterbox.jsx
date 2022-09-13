import { number, string } from "prop-types";

const IconChatterbox = ({
  size = 24,
  color = "currentColor",
  stroke = 3,
  className,
  ...props
}) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      strokeWidth={stroke}
      stroke={color}
      strokeLinecap="round"
      className={className}
      {...props}
    >
      <path d="M16 46.933L10.667 44v-6.667M10.667 26.667V20L16 17.067M26.667 10.933L32 8l5.333 2.933M48 17.067L53.333 20v6.667M53.333 37.333V44L48 46.987M37.333 53.067L32 56l-5.333-2.933M48 22.933L53.333 20M32 49.333V56M16 22.933L10.667 20M43.25 34.5l-3.75-3.75h-8.75c-.69 0-1.25-.56-1.25-1.25V22c0-.69.56-1.25 1.25-1.25H42c.69 0 1.25.56 1.25 1.25v12.5M34.5 35.75v2.5c0 .69-.56 1.25-1.25 1.25H24.5l-3.75 3.75v-12.5c0-.69.56-1.25 1.25-1.25h2.5" />
    </svg>
  );
};

IconChatterbox.propTypes = {
  size: number,
  color: string,
  stroke: number,
};

export default IconChatterbox;