import React from "react";

export interface IBaseTemplate {
  sampleTextProp: string;
}

const BaseTemplate: React.FC<IBaseTemplate> = ({ sampleTextProp }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 inline-block p-2 px-3 rounded-2xl cursor-pointer text-white shadow-md shadow-blue-200">
      <p>{sampleTextProp}</p>
    </div>
  );
};

export default BaseTemplate;
