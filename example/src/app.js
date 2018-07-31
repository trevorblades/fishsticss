import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import GitHubLogo from 'react-icons/lib/fa/github';
import Paper from '@material-ui/core/Paper';
import React, {Component, Fragment} from 'react';
import Switch from '@material-ui/core/Switch';
import SyntaxHighlighter from 'react-syntax-highlighter/light';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import outdent from 'outdent/lib';
import select from 'select';
import styled from 'react-emotion';
import theme from '@trevorblades/mui-theme';
import transformCss from '../../lib';
import {hot} from 'react-hot-loader';
import {atomOneDark} from 'react-syntax-highlighter/styles/hljs';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
});

const GitHubLink = styled.a({
  marginLeft: 'auto',
  color: 'inherit'
});

const Content = styled.div({
  display: 'flex',
  flexGrow: 1
});

const padding = theme.spacing.unit * 3;
const {fontFamily, fontSize, body1} = theme.typography;
const {lineHeight} = body1;
const Input = styled.textarea({
  width: '50%',
  padding,
  border: 'none',
  fontFamily,
  fontSize,
  lineHeight,
  outline: 'none'
});

const Output = styled.div({
  flexGrow: 1,
  position: 'relative'
});

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)({
  flexGrow: 1,
  height: '100%',
  margin: 0,
  fontSize,
  lineHeight
});

const Options = styled(Paper)({
  paddingLeft: theme.spacing.unit * 2,
  position: 'absolute',
  bottom: padding,
  right: padding
});

class App extends Component {
  state = {
    spaces: true,
    input: outdent`
      #id {
        width: 420px;
        color: green;
      }

      #id .child-class {
        overflow: hidden;
      }

      #id .child-class p {
        margin: 0 1em;
      }

      #id .child-class p:last-child {
        margin-bottom: 0;
      }
    `
  };

  onInputKeyDown(event) {
    // cause the tab key to print tabs
    if (event.keyCode === 9) {
      const start = event.target.selectionStart;
      const {value} = event.target;
      event.target.value =
        value.substring(0, start) +
        '\t' +
        value.substring(event.target.selectionEnd);
      event.target.selectionStart = event.target.selectionEnd = start + 1;
      event.preventDefault();
    }
  }

  onInputChange = event => this.setState({input: event.target.value});

  onSpacesChange = event => this.setState({spaces: event.target.checked});

  onOutputClick = event => select(event.currentTarget);

  render() {
    const {input, spaces} = this.state;
    const output = transformCss(input, {spaces});
    return (
      <Fragment>
        <CssBaseline />
        <Container>
          <AppBar position="static" elevation={0}>
            <Toolbar>
              <Typography variant="title" color="inherit">
                🐠 transform-css
              </Typography>
              <Tooltip title="View on GitHub">
                <GitHubLink
                  href="https://github.com/trevorblades/transform-css"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubLogo size={32} />
                </GitHubLink>
              </Tooltip>
            </Toolbar>
          </AppBar>
          <Content>
            <Input
              spellCheck={false}
              value={input}
              onChange={this.onInputChange}
              onKeyDown={this.onInputKeyDown}
            />
            <Output>
              <StyledSyntaxHighlighter
                language="less"
                style={atomOneDark}
                customStyle={{
                  padding,
                  backgroundColor: theme.palette.grey[900]
                }}
                onClick={this.onOutputClick}
              >
                {output}
              </StyledSyntaxHighlighter>
              <Options>
                <FormControlLabel
                  control={
                    <Switch checked={spaces} onChange={this.onSpacesChange} />
                  }
                  label="Indent using spaces"
                />
              </Options>
            </Output>
          </Content>
        </Container>
      </Fragment>
    );
  }
}

export default hot(module)(App);
