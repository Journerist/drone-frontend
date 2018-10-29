import React from 'react';
import Button from "@material-ui/core/Button/Button";

import {withStyles} from '@material-ui/core/styles';
import {fetchCommands} from "./commandFetchers";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

 class CommandsOverview extends React.Component {
  state = {commands: []};

  async componentDidMount() {
    const commands = await fetchCommands();
    this.setState({
      commands: commands
    })
  }

  render() {
    const {classes} = this.props;

    return <React.Fragment>
      {this.state.commands.map(command => {
        return (
            <Button key={command.getEndpoint()} variant="contained" className={classes.button}>
              {command.getName()}
            </Button>
        )
      })}

    </React.Fragment>
  }

}

export default withStyles(styles)(CommandsOverview);