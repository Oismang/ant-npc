import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';
import { ANT_HEIGHT, ANT_WIDTH } from '../../constants';

const Ant = (props) => {
    const [image] = useImage(require("../../../assets/ant.png"));

    return <Image
        {...props}
        image={image}
        width={ANT_WIDTH}
        height={ANT_HEIGHT}
        rotation={150}
    />;
}

export default Ant;
