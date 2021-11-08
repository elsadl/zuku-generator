<script>
  import { getRandomInt } from "./utils";

  import { shapes } from "./elements/shapes";

  import { gridComposition, gridSize, colors } from "./store";

  export let row;
  export let col;

  const sides = [
    { name: "top", opposite: "bottom" },
    { name: "bottom", opposite: "top" },
    { name: "right", opposite: "left" },
    { name: "left", opposite: "right" },
  ];

  $: color = $colors[getRandomInt($colors.length)];

  if (!$gridComposition[row]) {
    let skel = [];
    for (let i = 0; i < $gridSize.cols; i++) {
      skel = [...skel, null];
    }
    $gridComposition[row] = skel;
  }

  const neighbours = {
    top: $gridComposition[row - 1] ? $gridComposition[row - 1][col] : null,
    right: $gridComposition[row][col + 1]
      ? $gridComposition[row][col + 1]
      : null,
    bottom: $gridComposition[row + 1] ? $gridComposition[row + 1][col] : null,
    left: $gridComposition[row][col - 1]
      ? $gridComposition[row][col - 1]
      : null,
  };

  let shape;
  let valid = false;

  const pickShape = () => {
    shape = shapes[getRandomInt(shapes.length)];

    let connect = {
      top: false,
      right: false,
      bottom: false,
      left: false,
    };

    for (const side of sides) {
      if (neighbours[side.name]) {
        if (
          shape.constraints[side.name] === neighbours[side.name][side.opposite]
        ) {
          connect[side.name] = true;
        }
      } else {
        connect[side.name] = true;
      }
    }

    if (connect.top && connect.right && connect.bottom && connect.left) {
      valid = true;
    }
  };

  while (!valid) {
    pickShape();
  }

  $gridComposition[row][col] = shape.constraints;
</script>

<div data-shape={shape.id} data-row={row} data-col={col}>
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill={color.hex}
    xmlns="http://www.w3.org/2000/svg"
  >
    {@html shape.svg}
  </svg>
</div>
