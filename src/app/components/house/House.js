import React from 'react';
import { Image, Text } from 'react-konva';
import useImage from 'use-image';
import { HOUSE_HEIGTH, HOUSE_WIDTH } from '../../constants';

const House = (props) => {
  const [image] = useImage(require("../../../assets/house.png"));

  return <>
    <Image
      x={props.x}
      y={props.y}
      image={image}
      width={HOUSE_WIDTH}
      height={HOUSE_HEIGTH}
      offsetX={ HOUSE_WIDTH }
      offsetY={ HOUSE_HEIGTH  }
    />
    <Text x={props.x - HOUSE_WIDTH} y={props.y} text={`count: ${props.leafsCounter}`} />
  </>
}

export default House;
