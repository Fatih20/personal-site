<script lang="ts">
  import type { IActivityCategorized } from "../../data/types";
  import {
    monthNumberToMonth,
    timeCaptionGenerator,
  } from "../../data/utilities";

  export let activityProps: IActivityCategorized;
  const { title, institution, insitutionLink, description } = activityProps;

  const timeCaption = timeCaptionGenerator(activityProps);
  console.log(description);
</script>

<main>
  <h2 id="title">{title}</h2>
  <h3 id="subtitle">
    <span>{timeCaption}</span> | <a href={insitutionLink}>{institution}</a>
  </h3>
  <div id="description-container">
    {@html description}
  </div>
</main>

<style>
  main {
    --title-font-size: 1.3em;
    --subtitle-font-size: 1em;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: var(--foreground-element-color);
    border-radius: 0.4em;
    padding: 0.75em;
  }

  #title {
    font-size: var(--title-font-size);
  }

  #subtitle {
    font-size: var(--subtitle-font-size);
  }

  #description-container {
    list-style: none;
    /* list-style-position: inside; */
  }
</style>
