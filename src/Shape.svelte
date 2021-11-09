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

  $: randomColor = () => {
    return $colors[getRandomInt($colors.length)];
  };

  $: cssVarStyles = `--random-color-one: ${randomColor().hex}; --random-color-two: ${randomColor().hex}; --random-color-three: ${randomColor().hex};`;

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

<g
  style={cssVarStyles}
  transform="translate({100 * col}, {100 * row})"
  data-shape={shape.id}
  data-row={row}
  data-col={col}
  fill={randomColor().hex}
>
  {@html shape.svg}
</g>
