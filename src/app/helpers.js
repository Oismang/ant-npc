import { VIEW_WIDTH, VIEW_HEIGHT, ANT_SPEED, CLOSEST_DISTANCE } from "./constants";

export const delaySeconds = (seconds) => {
	return new Promise((resolve) => setTimeout(() => resolve(), seconds));
};

export function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

export function getRandomPoint() {
    return { x: getRandomArbitrary(0, VIEW_WIDTH),
        y: getRandomArbitrary(0, VIEW_HEIGHT) };
}

export function getDistance(point1, point2) {
    const a = point1.x - point2.x;
    const b = point1.y - point2.y;

    return Math.sqrt( a*a + b*b );
}

export function getClosestLeaf(ant, leafs) {
    const distances = leafs.map((leaf) => {
      return getDistance(ant, leaf);
    });
    let minIndex = distances.indexOf(Math.min(...distances));
    return { leaf: leafs[minIndex], indx: minIndex };
}

export function calculateNewCoords(ant, point) {
  let newX;
  let newY;
  if (Math.abs(ant.x - point.x) <= CLOSEST_DISTANCE / 2) {
    newX = ant.x;
  } else {
    newX = ant.x < point.x ? ant.x + ANT_SPEED : ant.x - ANT_SPEED;
  }
  if (Math.abs(ant.y - point.y) <= CLOSEST_DISTANCE / 2) {
    newY = ant.y;
  } else {
    newY = ant.y < point.y ? ant.y + ANT_SPEED : ant.y - ANT_SPEED;
  }
  return { x: newX, y: newY };
}

export function calculateAwayCoords(ant, mousePoint) {
  const newX = ant.x + ((ant.x - mousePoint.x) * 0.5);
  const newY = ant.y + ((ant.y - mousePoint.y) * 0.5);
  return { x: newX, y: newY };
}