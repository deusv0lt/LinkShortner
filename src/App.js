import React, { useState } from "react";
import Axios from "axios";
import { loadProgressBar } from "axios-progress-bar";

const App = () => {
  const [link, setLink] = useState("");
  const [short, setShort] = useState("");
  const token = "TOKEN GOES HERE";

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(link);

    Axios.post(
      "https://api-ssl.bitly.com/v4/shorten",
      { long_url: link },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        setShort(response.data.link);
      })
      .catch((error) => {
        console.log(error.response.data.description);
      });
  };

  return (
    <>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdn.rawgit.com/rikmms/progress-bar-4-axios/0a3acf92/dist/nprogress.css"
      />
      <div class="wrapper">
        <h1>Link Copy</h1>

        <p>
          Select the link text by clicking within the input then copy yourself
          or just click the copy button. Paste into the paste side to see that
          it works!
        </p>
        <div class="container">
          <div class="copy">
            <h3>Link</h3>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                name="URL"
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                }}
              />

              <input type="submit" value="Shorten" />
            </form>
          </div>
          {short ? (
            <>
              <div class="paste">
                <h3>Shortened </h3>
                <form>
                  <input type="text" value={short} />
                </form>
              </div>
            </>
          ) : (
            loadProgressBar()
          )}
        </div>
      </div>
    </>
  );
};

export default App;
