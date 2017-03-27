import React, { PropTypes } from 'react';
import ReactDom from 'react-dom';
import ScaleText from '../../src/index';

const CenteredText = ({ text, fontSize }) => (
  <span className="comp-text centered">
    {text}<br />
    <span className="small">{fontSize}px</span>
  </span>
);
CenteredText.propTypes = {
  text: PropTypes.string,
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};


const App = () => (
  <div className="box-container">
    <div className="box">
      <ScaleText>left align</ScaleText>
    </div>
    <div className="box">
      <ScaleText>{0}</ScaleText>
    </div>
    <div className="box">
      <ScaleText>Longer text string that should wrap and scale</ScaleText>
    </div>
    <div className="box">
       <ScaleText><span className="centered">centered</span></ScaleText>
    </div>
    <div className="box">
       <ScaleText>
         <div className="centered">
           Larger Text<br />
          <span className="small">smaller text</span>
         </div>
      </ScaleText>
    </div>
    <div className="box">
       <ScaleText>
         <CenteredText text="centered" />
      </ScaleText>
    </div>
    <div className="box">
      <ScaleText>
        <div>Child #1</div>
        <div>Child #2</div>
        <div>No Scaling</div>
      </ScaleText>
    </div>
    <div className="box">
       <ScaleText minFontSize={25}>
         <CenteredText text="min 25px" />
      </ScaleText>
    </div>
    <div className="box">
       <ScaleText maxFontSize={30}>
         <CenteredText text="max 30px" />
      </ScaleText>
    </div>
    <div className="box">
       <ScaleText minFontSize={25} maxFontSize={30}>
         <CenteredText text="25-30px" />
      </ScaleText>
    </div>
  </div>
);


ReactDom.render(
  <App />,
  document.getElementById('root')
);
