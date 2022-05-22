<script lang="ts">
  import type { IProjectCategorized } from "../../data/types";
  import {
    monthNumberToMonth,
    timeCaptionGenerator,
  } from "../../data/utilities";
  import Title from "./Title.svelte";

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
  <Title {title} {timeCaption} />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
  }
</style>
