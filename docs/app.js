/* global Prism, React, ReactDOM, ScaleText */
const { Component, PropTypes } = React;

/* eslint-disable react/require-default-props */
const CenteredText = ({ text = '', fontSize = '' }) => (
  <span className="comp-text centered">
    {text}<br />
    <span className="small">{fontSize}px</span>
  </span>
);

CenteredText.propTypes = {
  text: PropTypes.string,
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};


const Box = (props) => {
  const { minFontSize, maxFontSize } = props;
  return (
    <div className="box">
      <ScaleText {...{ minFontSize, maxFontSize }} >
        {props.children}
      </ScaleText>
    </div>
  );
};
Box.propTypes = {
  minFontSize: PropTypes.oneOfType([PropTypes.number || PropTypes.string]),
  maxFontSize: PropTypes.oneOfType([PropTypes.number || PropTypes.string]),
  children: PropTypes.node
};

class Example extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node || PropTypes.string]),
    genCode: PropTypes.func,
    title: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      minFontSize: '',
      maxFontSize: ''
    };
  }

  componentDidUpdate() {
    Prism.highlightAll();
  }

  render() {
    const { minFontSize, maxFontSize } = this.state;
    const { title, genCode } = this.props;
    return (
      <div className="example">
        <h4>{title}</h4>
        <p className="description">Change the min and max font-size and resize the browser window</p>
        <div className="box-container">
          <Box {...{ minFontSize, maxFontSize }}>
            {this.props.children}
          </Box>
        </div>
        <div className="example-footer">
          <div className="controls">
            <label className="label" htmlFor="minFontSize">Min. Font Size</label>
            <input
              type="number"
              name="minFontSize"
              placeholder="0"
              min="0"
              value={minFontSize}
              onChange={e => this.setState({ minFontSize: e.target.value })}
            />
            <label className="label" htmlFor="maxFontSize">Max. Font Size</label>
            <input
              type="number"
              name="maxFontSize"
              placeholder="POS_INFINITY"
              min="0"
              value={maxFontSize}
              onChange={e => this.setState({ maxFontSize: e.target.value })}
            />
          </div>
          <div className="code">
            <pre><code className="language-js">
              { genCode(this.state) }
            </code></pre>
          </div>
        </div>
      </div>
    );
  }
}


class App extends Component {
  componentDidMount() {
    Prism.highlightAll();
  }

  componentDidUpdate() {
    Prism.highlightAll();
  }

  getCodeFn(child) {
    return (props) => {
      const sprops = Object.keys(props).filter(prop => props[prop] !== '').map(prop => `${prop}={${props[prop]}}`);
      return `
  const Component = (props) => (
    <ScaleText${sprops.length ? ' ' + sprops.join(' ') : ''}>
      ${child}
    </ScaleText>
  );
  `;
    };
  }

  render() {
    return (
      <div>
        <Example
          title="With plain text node"
          genCode={this.getCodeFn('example')}
        >
          example
        </Example>
        <Example
          title="With Single Child Component"
          genCode={this.getCodeFn('<CenteredText text="centered" />')}
        >
          <CenteredText text="centered" />
        </Example>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
