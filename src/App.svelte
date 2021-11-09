<script>
  import Shape from "./Shape.svelte";

  import { allColors } from "./elements/colors.js";

  import { gridComposition, gridSize, colors } from "./store";

  let backgroundColor = "#FFFFFF";

  $colors = allColors.filter((color) => color.hex != backgroundColor);

  const initGrid = (cols, rows) => {
    let row = [];
    for (let i = 0; i < cols; i++) {
      row = [...row, null];
    }
    for (let i = 0; i < rows; i++) {
      $gridComposition = [...$gridComposition, [...row]];
    }
    console.log($gridComposition);
  };

  initGrid($gridSize.cols, $gridSize.rows);

  const changeBackgroundColor = (newColor) => {
    backgroundColor = newColor;
    $colors = allColors.filter((color) => color.hex != backgroundColor);
  };

  const exportSvg = () => {
    svgExport.downloadSvg(
      document.querySelector("#grid-container svg"),
      "zuku-pattern",
      // { width: $gridSize.cols * 100, height: $gridSize.rows * 100 }
    );
  };

  $: cssVarStyles = `--bg-color: ${backgroundColor};
  --grid-cols: repeat(${$gridSize.cols}, 100px);`;
</script>

<div id="global-container" style={cssVarStyles}>
  <div id="options">
    <!-- taille de la grille -->
    <div id="grid-size">
      <div class="flex">
        <label for="">colonnes :</label>
        <input type="number" bind:value={$gridSize.cols} min="0" max="60" />
      </div>
      <div class="flex">
        <label for="">lignes :</label>
        <input type="number" bind:value={$gridSize.rows} min="0" max="60" />
      </div>
    </div>
    <!-- couleur de fond -->
    <ul id="bg-colors">
      {#each allColors as color}
        <li
          on:click={() => changeBackgroundColor(color.hex)}
          class={color.hex === backgroundColor ? "selected" : ""}
        >
          {color.name}
        </li>
      {/each}
    </ul>
    <!-- exportation -->
    <p on:click={exportSvg}>Exporter</p>
  </div>

  <div id="grid-container">
    <svg width={$gridSize.cols * 100} height={$gridSize.rows * 100}>
      <rect width={$gridSize.cols * 100} height={$gridSize.rows * 100} x=0 y=0 fill={backgroundColor}></rect>
      {#each [...Array($gridSize.rows).keys()] as _, i}
        {#each [...Array($gridSize.cols).keys()] as _, j}
          <Shape row={i} col={j} />
        {/each}
      {/each}
    </svg>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    color: black;
  }

  #grid-container {
    display: grid;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
  }
  
/* #grid-container svg {
    background-color: var(--bg-color);
  } */

  #grid-size {
    position: absolute;
    top: 2em;
    left: 2em;
  }

  #bg-colors {
    position: absolute;
    display: flex;
    list-style: none;
    top: 2em;
    right: 2em;
  }

  #bg-colors li {
    cursor: pointer;
  }

  #bg-colors li + li {
    margin-left: 1em;
  }

  #bg-colors li.selected {
    border-bottom: 1px solid;
  }

  .flex {
    display: flex;
    align-items: baseline;
  }

  .flex label {
    margin-right: 0.8em;
  }
</style>
