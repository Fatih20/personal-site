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
  #description-container {
    list-style: none;
    /* list-style-position: inside; */
  }
</style>
