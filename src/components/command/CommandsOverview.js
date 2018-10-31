import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button/Button";

import { withStyles } from "@material-ui/core/styles";
import { fetchCommands } from "./commandFetchers";
import {apiBaseUrl} from "../../config";

function CommandsOverview({classes}) {
  const commands = useCommands()
  
  return (
    <React.Fragment>
      {commands.map(command => {
        return (
          <Button
            key={command.getId()}
            variant="contained"
            className={classes.button}
            onClick={() => onCommandClick(command)}
          >
            {command.getName()}
          </Button>
        );
      })}
    </React.Fragment>
  );
}

async function onCommandClick(command) {
  const res = await fetch(`${apiBaseUrl}/command/${command.getId()}/execute`);
  const json = await res.json();
  alert(JSON.stringify(json));
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
