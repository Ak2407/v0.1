import MobileSidebar from "@/app/[chatId]/_components/MobileSidebar";

const Header = () => {
  return (
    <div className="w-full flex items-center justify-between sm:justify-end mt-6">
      <MobileSidebar />
      <div className="text-[10px] bg-gray-200 px-[10px] py-[4px] rounded-full flex items-center justify-center gap-[2px] ">
        <a
          href="https://platform.openai.com/docs/overview"
          target="_blank"
          className="text-pretty hover:text-pretty-dark cursor-pointer"
        >
          <h1>Made using OpenAI API</h1>
        </a>
      </div>
    </div>
  );
};

export default Header;
