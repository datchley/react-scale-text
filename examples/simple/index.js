import React, { PropTypes } from 'react';
import ReactDom from 'react-dom';
import ScaleText from '../../src/index';

const Circle = ({ text }) => (
  <div className="circle" style={{ float: 'left' }}>
  <div className="xcontent">
    <span>{text}</span>
  </div>
</div>
);
Circle.propTypes = {
  text: PropTypes.string
};

const Box = ({ text = '', centered = false, ...props }) => (
  <div className="box">
    <ScaleText {...props}>
      <span className={`box-text ${centered ? 'centered' : ''}`}>
        {text}
      </span>
    </ScaleText>
  </div>
);
Box.propTypes = {
  text: PropTypes.string,
  centered: PropTypes.bool
};

const App = () => (
  <div>
    <h2>Examples</h2>
    <p>To see the component in action, resize the browser window.</p>
    <p>The markup rendering each box below is the following:<br />
    <code><pre style={{ whiteSpace: 'pre' }}>
      <span className="line line--1">&lt;div class="box"&gt;</span><br />
      <span className="line line--2">  &lt;ScaleText&gt;</span><br />
      <span className="line line--3">    &lt;span class="box-text"&gt;</span><br />
      <span className="line line--4">      Box 1</span><br />
      <span className="line line--3">    &lt;/span&gt;</span><br />
      <span className="line line--2">  &lt;/ScaleText&gt;</span><br />
      <span className="line line--1">&lt;/div&gt;</span><br />
      </pre></code>
    </p>
    <div className="description">
      <Circle text={1} />
      <code style={{ float: 'left', margin: '1.5em 1em' }}>&lt;ScaleText /&gt;</code>
      <div style={{ clear: 'both' }}></div>
    </div>
    <div className="box-container">
      <Box text={"Box 1"} centered />
    </div>

    <div className="description">
      <Circle text={2} />
      <code style={{ float: 'left', margin: '1.5em 1em' }}>
        &lt;ScaleText minFontSize={20} /&gt;
      </code>
      <div style={{ clear: 'both' }}></div>
    </div>
    <div className="box-container">
      <Box text={"Box 2"} centered minFontSize={20} />
    </div>

    <div className="description">
      <Circle text={3} />
      <code style={{ float: 'left', margin: '1.5em 1em' }}>
        &lt;ScaleText maxFontSize={55} /&gt;
      </code>
      <div style={{ clear: 'both' }}></div>
    </div>
    <div className="box-container">
      <Box text={"Box 3"} centered maxFontSize={55} />
    </div>

    <div className="description">
      <Circle text={4} />
      <code style={{ float: 'left', margin: '1.5em 1em' }}>
        &lt;ScaleText minFontSize={20} maxFontSize={55} /&gt;
      </code>
      <div style={{ clear: 'both' }}></div>
    </div>
    <div className="box-container">
      <Box text={"Box 4"} minFontSize={20} maxFontSize={55} />
    </div>

    <div className="description">
      <Circle text={5} />
      <code style={{ float: 'left', margin: '1.5em 1em' }}>&lt;ScaleText /&gt;</code>
      <div style={{ clear: 'both' }}></div>
    </div>
    <div className="box-container">
      <Box text={"Box 4"} minFontSize={20} maxFontSize={55} />
    </div>

  </div>
);

ReactDom.render(
  <App />,
  document.getElementById('root')
);
