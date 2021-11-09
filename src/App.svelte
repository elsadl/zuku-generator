<script>
  import Shape from "./Shape.svelte";

  import { shapes } from "./elements/shapes";

  import { allColors } from "./elements/colors.js";

  import { gridComposition, gridSize, colors } from "./store";

  let backgroundColor = "#FFFFFF";

  let renew = false;
  let shapesCopy = [...shapes];

  const emptyBlock = {
    id: "empty",
    svg: ``,
    constraints: {
      top: false,
      right: false,
      bottom: false,
      left: false,
    },
  };

  $: density = 1;

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

  const updateDensity = () => {
    console.log("heho")
    shapesCopy = [...shapes];
    for (let i = 0; i < density; i++) {
      shapesCopy.push(emptyBlock);
    }
    shapesCopy = [...shapesCopy]
    console.log(shapesCopy);
    generateNewPattern();
  };

  const generateNewPattern = () => {
    console.log(shapesCopy)
    initGrid();
    console.log(shapesCopy)
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
</script>

<div>
  <div id="options">
    <!-- taille de la grille -->
    <div id="grid-size">
      <h4>dimensions</h4>
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
    <div>
      <h4>couleur de fond</h4>
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
    </div>
    <div>
      <label for="density">densité</label>
      <input
        type="range"
        bind:value={density}
        min="0"
        max="50"
        step="1"
        on:input={updateDensity}
      />
    </div>
    <!-- exportation -->
    <div>
      <h4 class="button" on:click={generateNewPattern}>
        générer un nouveau motif
      </h4>
    </div>
    <div>
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
            <Shape shapes={[...shapesCopy]} row={i} col={j} />
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

  #grid-container {
    display: grid;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
  }

  #grid-container > * {
    grid-row: 1/1;
    grid-column: 1/1;
  }

  #bg-colors {
    display: flex;
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
