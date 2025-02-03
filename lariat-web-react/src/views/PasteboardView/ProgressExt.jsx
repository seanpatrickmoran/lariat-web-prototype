import React from 'react';
import "./Downloading.css"
export const BasicProgressBarWithLabel = ({currentValue, label, maxValue}) => (
  <>
      <div id="idCOMPT">
      <label for="progress-bar">{label}</label>
      <progress id="progress-bar" value={currentValue} max={maxValue}>{currentValue}%</progress>
      </div>
  </>
);