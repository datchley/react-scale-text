import React from 'react';
import ReactDom from 'react-dom';
import ScaleText from '../../src/index';

const App = () => (
  <div>
    <div className="box-descriptions">
      <ul>
        <li> <b>Box 1</b> - <code>&lt;ScaleText /&gt;</code></li>
        <li> <b>Box 2</b> - <code>&lt;ScaleText minFontSize={12} /&gt;</code></li>
        <li> <b>Box 3</b> - <code>&lt;ScaleText maxFontSize={35} /&gt;</code></li>
      </ul>
    </div>
    <div className="box-container">
      <div className="box">
        <ScaleText>
          <span className="box-text">Box 1</span>
        </ScaleText>
      </div>
      <div className="box">
        <ScaleText minFontSize={12}>
          <span className="box-text">Box 2</span>
        </ScaleText>
      </div>
      <div className="box">
        <ScaleText maxFontSize={35}>
          <span className="box-text">Box 3</span>
        </ScaleText>
      </div>
    </div>
  </div>
);

ReactDom.render(
  <App />,
  document.getElementById('root')
);
