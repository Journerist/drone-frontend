import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button/Button";
import { withStyles } from "@material-ui/core/styles";
import Motor from '../../entity/Motor'
import CardActions from "@material-ui/core/es/CardActions/CardActions";
import CardActionArea from "@material-ui/core/es/CardActionArea/CardActionArea";
import CardMedia from "@material-ui/core/es/CardMedia/CardMedia";
import Typography from "@material-ui/core/es/Typography/Typography";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Card from "@material-ui/core/es/Card/Card";
import { transmitMotorInformationToServer } from "../../entity/MotorInformationTransmitter";

const CHANGE_MOTOR_SPEED_VALUE = 50;
const MOTOR_START_VALUE = 100;

const styles = {
  cardListing: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    alignContent: 'center',
    overflow: 'hidden',
  },
  controlAllCard: {
    width: '100%',
    margin: '0.2rem',
    textAlign: 'center',
  },
  controlAllCardActions: {
    justifyContent: 'space-around'
  },
  card: {
    margin: '0.2rem',
    width: 'calc(25% - 0.4rem)',
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};

const motors = [...Array(4).keys()].map( (_, i) => new Motor(MOTOR_START_VALUE, i))

function CommandsOverview({classes}) {

  return (
      <div className={classes.cardListing}>
        {motors.map( (m, i) => createCardForMotor(m, `Motor ${i}`))}
      <Card className={classes.controlAllCard}>
        <CardActions className={classes.controlAllCardActions}>
          <Button
              size="small"
              color="primary"
              className={classes.button}
              onClick={() => {
                motors.forEach( m => m.changeMotorSpeed(CHANGE_MOTOR_SPEED_VALUE))
                transmitMotorInformationToServer(motors);
              }}
          >
            Increase all
          </Button>

          <Button
              size="small"
              color="secondary"
              onClick={() => {
                motors.forEach( m => m.changeMotorSpeed(CHANGE_MOTOR_SPEED_VALUE * -1))
                transmitMotorInformationToServer(motors);
              }}
          >
            Decrease all
          </Button>

          <Button
              size="small"
              color="secondary"
              onClick={() => {
                motors.forEach( m => m.setMotorSpeed(MOTOR_START_VALUE))
                transmitMotorInformationToServer(motors);
              }}
          >
            Reset to {MOTOR_START_VALUE}
          </Button>
        </CardActions>
      </Card>
      </div>
  );

  function createCardForMotor(motor, title) {
    const [speed, setSpeed] = useState(motor.getSpeed())
    motor.setStateHandlerForSpeed(setSpeed)

    return <React.Fragment>
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography component="p">
              current speed: {speed}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
              size="small"
              color="primary"
              className={classes.button}
              onClick={() => {
                motor.changeMotorSpeed(CHANGE_MOTOR_SPEED_VALUE);
                transmitMotorInformationToServer([motor]);
              }}
          >
            Increase
          </Button>

          <Button
              size="small"
              color="secondary"
              onClick={() => {
                motor.changeMotorSpeed(CHANGE_MOTOR_SPEED_VALUE * -1);
                transmitMotorInformationToServer([motor]);
              }}
          >
            Decrease
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  }
}

export default withStyles(styles)(CommandsOverview);
