<script lang="ts">
  import type { IProjectCategorized } from "../../data/types";
  import {
    monthNumberToMonth,
    timeCaptionGenerator,
  } from "../../data/utilities";
  import DescriptionContainer from "./DescriptionContainer.svelte";
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
  <DescriptionContainer {description} />
  <div id="project-link-container">
    <div id="project-link">
      <p>See Project</p>
      <i class="fa-solid fa-arrow-up-right-from-square arrow-icon" />
    </div>
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
  }

  #project-link-container {
    align-items: flex-start;
    border-top: solid 2px var(--text-element-color);
    display: flex;
  }

  #project-link {
    align-items: center;
    cursor: pointer;
    display: flex;
    justify-content: center;
    gap: 0.4em;
    transition: gap 0.2s;
    transition-timing-function: ease-in-out;
  }

  #project-link:hover {
    gap: 0.8em;
  }

  .arrow-icon {
    font-weight: 600;
    /* border: solid 1px white; */
  }
</style>
