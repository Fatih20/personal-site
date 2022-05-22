<script lang="ts">
  import type { IProjectCategorized } from "../../data/types";
  import {
    monthNumberToMonth,
    timeCaptionGenerator,
  } from "../../data/utilities";

  export let projectProps: IProjectCategorized;
  const {
    title,
    projectLink,
    ongoing,
    monthStart,
    yearStart,
    monthEnd,
    yearEnd,
    description,
  } = projectProps;

  const timeCaption = timeCaptionGenerator(projectProps);
</script>

<main>
  <h2>{title}</h2>
  <h3>{timeCaption}</h3>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
  }
</style>
