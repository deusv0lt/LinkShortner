import React, { useState } from "react";
import Axios from "axios";
import { loadProgressBar } from "axios-progress-bar";

const App = () => {
  const [link, setLink] = useState("");
  const [short, setShort] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(link);

    Axios.post(
      "https://70kjgxiij1.execute-api.ap-south-1.amazonaws.com/URLShortener-Create",
      {
        longURL: link,
      }
    )
      .then((response) => {
        console.log(response);
        setShort(response.data);
      })
      .catch((error) => {
        console.log(error);
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
