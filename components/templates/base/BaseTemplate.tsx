import React from "react";

export interface IBaseTemplate {
  sampleTextProp: string;
}

const BaseTemplate: React.FC<IBaseTemplate> = ({ sampleTextProp }) => {
  return (
    <div className="bg-blue-300 inline-block p-2 rounded-2xl">
      <p>{sampleTextProp}</p>
    </div>
  );
};

export default BaseTemplate;
