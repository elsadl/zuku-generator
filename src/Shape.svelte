<script>
  import { afterUpdate, beforeUpdate } from "svelte";

  import { getRandomInt } from "./utils";

  import { gridComposition, gridSize, colors } from "./store";

  export let row;
  export let col;
  export let shapes;

  const sides = [
    { name: "top", opposite: "bottom" },
    { name: "bottom", opposite: "top" },
    { name: "right", opposite: "left" },
    { name: "left", opposite: "right" },
  ];

  beforeUpdate(() => {
    // console.log("before update")
    // console.log(shapes)
  })

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

<g
  transform="translate({100 * col}, {100 * row})"
  data-shape={shape.id}
  data-row={row}
  data-col={col}
  fill={color.hex}
>
  {@html shape.svg}
</g>

<style>
  path {
  }
</style>
