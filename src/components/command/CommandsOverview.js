import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button/Button";

import { withStyles } from "@material-ui/core/styles";
import { fetchCommands } from "./commandFetchers";

function CommandsOverview({classes}) {
  const commands = useCommands()
  
  return (
    <React.Fragment>
      {commands.map(command => {
        return (
          <Button
            key={command.getEndpoint()}
            variant="contained"
            className={classes.button}
          >
            {command.getName()}
          </Button>
        );
      })}
    </React.Fragment>
  );
}

function useCommands() {
  const [commands, setCommands] = useState([]);

  useEffect(async () => {
    const commands = await fetchCommands();
    setCommands(commands);
  }, []);

  return commands
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

export default withStyles(styles)(CommandsOverview);
