import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';
import { LEAF_HEIGTH, LEAF_WIDTH } from '../../constants';

const Leaf = (props) => {
    const [image] = useImage(require("../../../assets/leaf.png"));
    return <Image {...props}
        image={image}
        width={LEAF_WIDTH}
        height={LEAF_HEIGTH}
        offsetX={LEAF_WIDTH}
        offsetY={LEAF_HEIGTH}
    />;
}

export default Leaf;
