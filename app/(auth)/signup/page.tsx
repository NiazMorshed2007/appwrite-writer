import RegisterForm from "./component/RegisterForm";

const Signup = () => {
  return (
    <>
      <div className="left md:w-7/12 w-full h-full p-6 flex flex-col items-center justify-center">
        <div className="pt-32 flex md:w-[500px] w-11/12 flex-col items-center">
          <h1 className="text-3xl text-center font-semibold">
            Create your account to explore!
          </h1>
          <p className="text-sm text-center">
            Experience a notion like editor with Appwrite.
          </p>

          <RegisterForm />
        </div>
      </div>
    </>
  );
};

export default Signup;
