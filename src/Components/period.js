import { useEffect, useState } from "react";

import Card from "./UI/card";
import "./period.css";

const Period = (props) => {
  const [selected, setSelected] = useState(props.selected);
  const [active, setActive] = useState(selected);
  const timeframes = props.timeframes;

  /* Show the current updated state and runs before render */
  useEffect(() => {
    setSelected(selected);
    props.selectTime(selected); //lift state up to parent component
  }, [selected]);

  const updateActiveElement = (id) => {
    setActive(active !== id ? id : selected);
  };

  const clickHandler = (e) => {
    const value = e.currentTarget.getAttribute("data-text");
    const selectedValue = e.currentTarget.getAttribute("data-text");
    setSelected(selectedValue); // choosing an item updates the state
    updateActiveElement(value); // update the state with the id of the active element
    props.onSelect(true);
  };

  return (
    <Card className="period">
      {timeframes.map((timeframe) => {
        return (
          <p
            key={timeframe.text}
            id={timeframe.id}
            data-text={timeframe.text}
            className={
              timeframe.text + " " + (active == timeframe.text ? "active" : "")
            }
            onClick={clickHandler}
          >
            {timeframe.text}
          </p>
        );
      })}
    </Card>
  );
};

export default Period;
