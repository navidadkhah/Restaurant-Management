import React from 'react'
import './CardPanel.css'

export const CardPanel = (props) => {
  return (
    <div >
      <div className="com-admin-block">
        <span>{props.title}</span>
        <span>{props.number}</span>
      </div>
    </div>
  );
}
