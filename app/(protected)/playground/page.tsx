import Menu from "@/app/menu";
import Editor from "@/ui/editor";

const Page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center sm:px-5 sm:pt-[calc(20vh)]">
      <div className="flex w-full items-center justify-end py-3 max-w-screen-lg">
        <Menu />
      </div>
      <Editor />
    </div>
  );
};

export default Page;
