export default function (components, state, action) {
	return Object.values(components).reduce((a, v) => v(a, action), state);
}
