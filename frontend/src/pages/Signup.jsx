import { Header, SignupComponent } from "../components/componentCollection.js";

function Signup() {
  return (
    <>
      <Header authorized={false} />
      <SignupComponent />
    </>
  )
}

export default Signup