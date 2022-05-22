<script lang="ts">
  import { timeCaptionGenerator } from "../../data/utilities";

  export let title: string;
  export let timeCaption: string;
  export let institution: string | undefined = undefined;
  export let institutionLink: string = "";
</script>

<main>
  <h2 id="title">{title}</h2>
  <h3 id="time-caption" class="subtitle">{timeCaption}</h3>
  {#if institution !== undefined}
    <h3
      id="institution"
      class="subtitle"
      on:click={() => window.open(institutionLink)}
    >
      {institution}
    </h3>
  {/if}
</main>

<style>
  main {
    --title-font-size: 1.3em;
    --subtitle-font-size: 1em;
  }
  #title {
    font-size: var(--title-font-size);
  }

  .subtitle {
    font-size: var(--subtitle-font-size);
  }

  #institution:hover {
    display: inline;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
