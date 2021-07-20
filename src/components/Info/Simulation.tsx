import * as React from 'react';
import { styled } from 'styletron-react';
import { StyleProps } from '../../style';
import { Value, StyledText } from '../../util';
import { ThemeProps } from '../theme';
import ValueEdit from '../ValueEdit';
import Field from '../Field';
import { Spacer } from '../common';
import { Switch } from '../Switch';
import Button from '../Button';
import { RobotPosition } from '../../RobotPosition';

export interface SimulationProps extends ThemeProps, StyleProps {
  robotStartPosition: RobotPosition;
  sensorNoise: boolean;
  realisticSensors: boolean;

  onSetRobotStartPosition: (position: RobotPosition) => void;
  onSensorNoiseChange: (enabled: boolean) => void;
  onRealisticSensorsChange: (enabled: boolean) => void;
}

type Props = SimulationProps;

const StyledValueEdit = styled(ValueEdit, (props: ThemeProps) => ({
  marginTop: `${props.theme.itemPadding}px`,
  ':first-child': {
    marginTop: 0
  }
}));

const StyledField = styled(Field, (props: ThemeProps) => ({
  marginTop: `${props.theme.itemPadding}px`,
  ':first-child': {
    marginTop: 0
  }
}));

const StyledButton = styled(Button, (props: ThemeProps) => ({
  display: 'flex',
  flexDirection: 'row',
  flex: '1 1',
  borderRadius: `0px`,
  border: `1px solid ${props.theme.borderColor}`,
  padding: `${props.theme.itemPadding}`,
  overflow: 'hidden',
  alignItems: 'center',
  alignContent: 'center',
}));


const Container = styled('div', {

});

const NAME_STYLE: React.CSSProperties = {
  fontSize: '1.2em'
};

const SENSOR_NOISE = StyledText.text({
  text: 'Sensor Noise',
  style: NAME_STYLE
});

export class Simulation extends React.PureComponent<Props> {
  private onXChange_ = (x: Value) => {
    const xDistance = Value.toDistance(x);
    if (xDistance.value === this.props.robotStartPosition.x.value) return;

    this.props.onSetRobotStartPosition({ ...this.props.robotStartPosition, x: xDistance });
  };

  private onYChange_ = (y: Value) => {
    const yDistance = Value.toDistance(y);
    if (yDistance.value === this.props.robotStartPosition.y.value) return;

    this.props.onSetRobotStartPosition({ ...this.props.robotStartPosition, y: yDistance });
  };

  private onZChange_ = (z: Value) => {
    const zDistance = Value.toDistance(z);
    if (zDistance.value === this.props.robotStartPosition.z.value) return;

    this.props.onSetRobotStartPosition({ ...this.props.robotStartPosition, z: zDistance });
  };

  private onThetaChange_ = (theta: Value) => {
    const angle = Value.toAngle(theta);
    if (angle.value === this.props.robotStartPosition.theta.value) return;

    this.props.onSetRobotStartPosition({ ...this.props.robotStartPosition, theta: angle });
  };

  private onSensorNoiseChanged_ = (enabled: boolean) => {
    this.props.onSensorNoiseChange(enabled);
  };

  private onRealisticSensorsChanged_ = (enabled: boolean) => {
    this.props.onRealisticSensorsChange(enabled);
  };

  private onRobotPositionResetClicked_ = () => {
    this.props.onSetRobotStartPosition({ ...this.props.robotStartPosition });
  };

  render() {
    const { props } = this;
    const { theme, style, className, sensorNoise, realisticSensors, robotStartPosition: { x, y, z, theta } } = props;
    return (
      <Container style={style} className={className}>
        <StyledButton theme={theme} children={['Reset']} onClick={this.onRobotPositionResetClicked_}></StyledButton>
        <StyledValueEdit value={Value.distance(x)} onValueChange={this.onXChange_} theme={theme} name='X' />
        <StyledValueEdit value={Value.distance(y)} onValueChange={this.onYChange_} theme={theme} name='Y' />
        <StyledValueEdit value={Value.distance(z)} onValueChange={this.onZChange_} theme={theme} name='Z' />
        <StyledValueEdit value={Value.angle(theta)} onValueChange={this.onThetaChange_} theme={theme} name='Rotation' />
        <StyledField theme={theme} name='Sensor Noise' nameWidth={160}>
          <Spacer />
          <Switch value={sensorNoise} onValueChange={this.onSensorNoiseChanged_} theme={theme} />
        </StyledField>
        <StyledField theme={theme} name='Realistic Sensors' nameWidth={160}>
          <Spacer />
          <Switch value={realisticSensors} onValueChange={this.onRealisticSensorsChanged_} theme={theme} />
        </StyledField>
      </Container>
    );
  }
}