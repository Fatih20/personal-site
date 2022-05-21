<script lang="ts">
  import type { IAwardCategorized } from "../../data/types";
  import { monthNumberToMonth } from "../../data/utilities";

  export let awardProps: IAwardCategorized;
  const { title, institution, insitutionLink, monthAchieved, yearAchieved } =
    awardProps;

  const timeCaption = `${monthNumberToMonth[monthAchieved]} ${yearAchieved}`;
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
