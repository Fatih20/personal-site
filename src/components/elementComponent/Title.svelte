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
    --title-font-size: 1.4em;
    --subtitle-font-size: 1.1em;
    --gap-between-title-element: 0.25em;
    display: flex;
    flex-direction: column;
    gap: var(--gap-between-title-element);
    padding-bottom: var(--gap-between-title-element);
    border-bottom: solid 2px var(--line-color);
  }
  #title {
    font-size: var(--title-font-size);
  }

  .subtitle {
    font-size: var(--subtitle-font-size);
    font-weight: 600;
  }

  #institution:hover {
    display: inline;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
