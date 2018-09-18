import React, { Component, PureComponent } from "react";
import ReactDOM from "react-dom";
import { FixedSizeList as List } from "react-window";
import memoize from "memoize-one";
import AutoSizer from "react-virtualized-auto-sizer";

import "./styles.css";

const itemCount = 999;
const indexes = [...Array(itemCount).keys()];

// const rememberIndex = memoize(_ => _);
const rememberIndex = memoize(i => indexes[i]);
const rememberStyle = memoize(_ => _);

class ListItem extends PureComponent {
  render() {
    const { index, style } = this.props;
    const rememberedIndex = rememberIndex(index);
    const rememberedStyle = rememberStyle(style);

    return (
      <div
        className={rememberedIndex % 2 ? "ListItemOdd" : "ListItemEven"}
        style={{ ...rememberedStyle }}
      >
        Row {rememberedIndex}
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <AutoSizer>
        {({ width, height }) => (
          <List
            className="List"
            width={width / 3}
            height={height / 1.2}
            itemCount={itemCount}
            itemSize={35}
          >
            {ListItem}
          </List>
        )}
      </AutoSizer>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
