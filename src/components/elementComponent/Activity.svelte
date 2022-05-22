<script lang="ts">
  import type { IActivityCategorized } from "../../data/types";
  import {
    monthNumberToMonth,
    timeCaptionGenerator,
  } from "../../data/utilities";
  import DescriptionContainer from "./DescriptionContainer.svelte";
  import Title from "./Title.svelte";

  export let activityProps: IActivityCategorized;
  const { title, institution, institutionLink, description } = activityProps;

  const timeCaption = timeCaptionGenerator(activityProps);
  console.log(description);
</script>

<main>
  <Title {title} {timeCaption} {institution} {institutionLink} />
  <DescriptionContainer {description} />
</main>

<style>
  #description-container {
    /* list-style-position: inside; */
  }
</style>
