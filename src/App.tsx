import * as React from "react";
import "./App.css";
import { jwtDecode } from "jwt-decode";

function App() {
  type PayloadType = {
    preferred_locale?: string;
    phone?: string;
    last_name?: string;
    guid?: string;
    groups?: string;
    first_name?: string;
    email?: string;
    username?: string;
    iat?: number | undefined;
    sub?: string | undefined;
    iss?: string | undefined;
    jti?: string | undefined;
    nbf?: number | undefined;
    exp?: number | undefined;
  };
  const queryParameters = new URLSearchParams(window.location.search);
  const id_token = queryParameters.get("id_token");
  const token = React.useRef<string>();
  let [userName, setUserNmae] = React.useState<any>();
  React.useEffect(() => {
    token.current = id_token || "";
    // console.log(token.current);
    if (token.current !== null && token.current !== "") {
      var decoded = jwtDecode(token.current);
      console.log(decoded);
      const payload: PayloadType = decoded;
      setUserNmae(payload.username);
    }
  }, []);
  function sso() {
    let url =
      `https://login.xecurify.com/moas/broker/login/jwt/345259?` +
      `client_id=KPpgzIH6XldO5wtj&redirect_uri=http://localhost:3000/`;
    window.location.href = url;
  }
  return (
    <div className="App">
      <button onClick={sso}>Single Sign On</button>
      <>userName is {userName}</>
      <button
        onClick={() => {
          // console.log(userName);
          window.location.href = `https://proeffective.xecurify.com/moas/broker/login/jwt/logout/345259?
            client_id=KPpgzIH6XldO5wtj&redirect_uri=http://localhost:3000/`;
        }}
      >
        Sign Out
      </button>
    </div>
  );
}

export default App;
