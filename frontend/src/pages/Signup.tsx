import Auth from "../components/Auth";
import Quote from "../components/Quote";

function Signup() {
  return (
    <div className="grid  md:grid-cols-2">
      <div>
        <Auth loginPage = {false}/>
      </div>
      <div className="invisible md:visible">
        <Quote />
      </div>
    </div>
  );
}

export default Signup;
