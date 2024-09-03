const Footer = () => {
  return (
    <div className="flex gap-2 text-gray-600 text-[12px] font-normal mb-4">
      <a
        href="https://www.akshit.app/"
        target="_blank"
        className="hover:text-gray-900"
      >
        Portfolio
      </a>
      <div className="h-full w-[0.4px] bg-gray-400  "></div>
      <a
        href="https://x.com/DevAxit"
        target="_blank"
        className="hover:text-gray-900"
      >
        Twitter
      </a>
    </div>
  );
};

export default Footer;
