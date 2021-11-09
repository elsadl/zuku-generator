<script>
  import Shape from "./Shape.svelte";
  import Library from "./Library.svelte";

  import { allColors } from "./elements/colors.js";

  import { gridComposition, gridSize, colors } from "./store";

  let backgroundColor = "#FFFFFF";

  let renew = false;

  $colors = allColors.filter((color) => color.hex != backgroundColor);

  const initGrid = (cols, rows) => {
    $gridComposition = [];
    for (let i = 0; i < rows; i++) {
      $gridComposition[i] = [];
      for (let j = 0; j < cols; j++) {
        $gridComposition[i][j] = null;
      }
    }
  };

  initGrid($gridSize.cols, $gridSize.rows);

  const changeBackgroundColor = (newColor) => {
    backgroundColor = newColor;
    $colors = allColors.filter((color) => color.hex != backgroundColor);
  };

  const generateNewPattern = () => {
    initGrid();
    renew = true;
    setTimeout(() => {
      renew = false;
    }, 1);
  };

  const exportSvg = () => {
    svgExport.downloadSvg(
      document.querySelector("#grid-container svg"),
      "zuku-pattern"
      // { width: $gridSize.cols * 100, height: $gridSize.rows * 100 }
    );
  };

  $: cssVarStyles = `--bg-color: ${backgroundColor};
  --grid-cols: repeat(${$gridSize.cols}, 100px);`;
</script>

<div id="global-container" style={cssVarStyles}>
  <div id="options">
    <!-- taille de la grille -->
    <div>
      <input type="number" bind:value={$gridSize.cols} min="0" max="60" />
      <span>x</span>
      <input type="number" bind:value={$gridSize.rows} min="0" max="60" />
    </div>
    <!-- couleur de fond -->
    <div>
      <ul id="bg-colors">
        {#each allColors as color}
          <li
            on:click={() => changeBackgroundColor(color.hex)}
            class={color.hex === backgroundColor ? "selected" : ""}
            style="--background: {color.hex}; --contrast: {color.contrast}"
          >
            <!-- {color.name} -->
          </li>
        {/each}
      </ul>
    </div>
    <!-- exportation -->
    <div>
      <h4 class="button" on:click={generateNewPattern}>
        générer un nouveau motif
      </h4>
      <br />
      <h4 class="button" on:click={exportSvg}>exporter au format svg</h4>
    </div>
  </div>

  <div id="grid-container">
    <svg width={$gridSize.cols * 100} height={$gridSize.rows * 100}>
      <rect
        width={$gridSize.cols * 100}
        height={$gridSize.rows * 100}
        x="0"
        y="0"
        fill={backgroundColor}
      />
      {#if !renew}
        {#each [...Array($gridSize.rows).keys()] as _, i}
          {#each [...Array($gridSize.cols).keys()] as _, j}
            <Shape row={i} col={j} />
          {/each}
        {/each}
      {/if}
    </svg>
  </div>
</div>

<style>
  #options {
    position: fixed;
    z-index: 10;
    background-color: white;
    border: 1px solid;
    padding: 1em;
    top: 2em;
    left: 2em;
  }

  #options > * + * {
    padding-top: 1em;
  }

  input {
    font-size: 1.8em;
    text-align: right;
  }

  #grid-container {
    display: grid;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
  }

  #bg-colors {
    display: flex;
  }

  #bg-colors li {
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 30px;
    border: 1px solid black;
    background-color: var(--background);
  }

  #bg-colors li + li {
    margin-left: 1em;
  }

  #bg-colors li.selected {
    border-bottom: 6px solid;
  }

  .button {
    cursor: pointer;
    border-bottom: 1px solid transparent;
    display: inline-block;
  }

  .button:hover {
    border-bottom: 1px solid black;
  }

  .button::before {
    content: "→";
    padding-right: 0.3em;
  }
</style>
