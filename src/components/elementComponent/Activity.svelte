<script lang="ts">
  import type { IActivityCategorized } from "../../data/types";
  import {
    monthNumberToMonth,
    timeCaptionGenerator,
  } from "../../data/utilities";
  import Title from "./Title.svelte";

  export let activityProps: IActivityCategorized;
  const { title, institution, institutionLink, description } = activityProps;

  const timeCaption = timeCaptionGenerator(activityProps);
  console.log(description);
</script>

<main>
  <Title {title} {timeCaption} {institution} {institutionLink} />
  <div id="description-container">
    {@html description}
  </div>
</main>

<style>
  main {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: var(--foreground-element-color);
    border-radius: 0.4em;
    padding: 0.75em;
  }

  #description-container {
    list-style: none;
    /* list-style-position: inside; */
  }
</style>
