<script lang="ts">
  import type { IActivityCategorized } from "../../data/types";
  import {
    monthNumberToMonth,
    timeCaptionGenerator,
  } from "../../data/utilities";

  export let activityProps: IActivityCategorized;
  const {
    title,
    institution,
    insitutionLink,
    ongoing,
    monthStart,
    yearStart,
    monthEnd,
    yearEnd,
    description,
  } = activityProps;

  const timeCaption = timeCaptionGenerator(activityProps);
</script>

<main>
  <h2>{title}</h2>
  <h3>
    <span>{timeCaption}</span> | <a href={insitutionLink}>{institution}</a>
  </h3>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
  }
</style>
