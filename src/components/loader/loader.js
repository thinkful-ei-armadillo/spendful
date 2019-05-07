import React from "react";
import "./loader.css";

export default function Loader() {
  // SVG from FontAwesome
  return (
    <div className="loader">
       <div className="lds-facebook"><div></div><div></div><div></div></div>
    </div>
  );
}