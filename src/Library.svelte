<script>
  import { shapes } from "./elements/shapes";
</script>

<div id="library">
  {#each shapes as shape}
    <div class="shape">
      <div>
        <p>{shape.id}</p>
        <svg width=100 height=100>
          {@html shape.svg}
        </svg>
      </div>
    </div>
  {/each}
</div>

<style>
  #library {
    width: 80vw;
    height: 80vh;
    overflow: scroll;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding: 60px;
    grid-gap: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  #library .shape {
    display: grid;
    align-items: center;
    justify-content: center;
  }
</style>
