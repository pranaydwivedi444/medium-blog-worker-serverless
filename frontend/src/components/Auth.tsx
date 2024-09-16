import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignupInput } from "pranaydwivedi444-zodvalidation-blog";
import Button from "./UI/Button";

type lgProps = {
  loginPage: boolean;
};

type LabelledInputProps = {
  label: string;
  name: string;
  type: string;
  value: string;
  placeholder:string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

 const LabelledInput = ({
   label,
   name,
   type,
   value,
   onChangeHandler,
   placeholder,
 }: LabelledInputProps) => {
   return (
     <div className="flex flex-col mb-4">
       <label htmlFor={name} className="text-xl pt-2 mb-2 font-semibold">
         {label}
       </label>
       <input
         type={type}
         name={name}
         id={name}
         value={value}
         onChange={onChangeHandler}
         placeholder={placeholder}
         required
         className="border border-gray-300 shadow p-3 w-full rounded"
       />
     </div>
   );
 };


function Auth(props: lgProps) {
  const navigate = useNavigate();
   const [formData, setFormData] = useState<SignupInput>({
     name: "",
     password: "",
     email: "",
   });
  const onClickHandler = () => {
    return navigate("/signin");
  };
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitted');
  };

  const formHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    const {name,value} = e.target;
    setFormData({
        ...formData,
        [name] : value,
    })
    console.log(formData)
  };

 

  return (
    <div className="min-h-screen flex flex-col  items-center justify-center">
      <div>
        <div className=" font-bold font-sans text-3xl text-pretty p-2 ">
          {props.loginPage ? "Login Account" : " Create a new account"}
        </div>
        <div className="pl-2 pr-1 pb-2 font-light text-gray-500">
          {!props.loginPage && (
            <>
              Already Have a Account ?
              <button
                className="underline underline-offset-2"
                onClick={onClickHandler}
              >
                Login Here{" "}
              </button>
            </>
          )}
        </div>
      </div>
      <div className="w-1/2">
        <form onSubmit={onSubmitHandler}>
          <LabelledInput
            label="Name"
            name="name"
            type="text"
            value = {formData.name ?? ""}
            placeholder="Type your Name here"
            onChangeHandler={formHandler}
          />
          <LabelledInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            placeholder="xyz@gmail.com"
            onChangeHandler={formHandler}
          />
          <LabelledInput
            label="Password"
            name="password"
            type="password"
            placeholder="Type your password here "
            value={formData.password}
            onChangeHandler={formHandler}
          />

          <Button type="submit">
            {props.loginPage ? "Login" : "Create Account"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Auth;