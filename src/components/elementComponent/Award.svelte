<script lang="ts">
  import type { IAwardCategorized } from "../../data/types";
  import { monthNumberToMonth } from "../../data/utilities";
  import DescriptionContainer from "./DescriptionContainer.svelte";
  import Title from "./Title.svelte";

  export let awardProps: IAwardCategorized;
  const { title, institution, institutionLink, monthAchieved, yearAchieved } =
    awardProps;

  const timeCaption = `${monthNumberToMonth[monthAchieved]} ${yearAchieved}`;
</script>

<main>
  <Title {title} {timeCaption} {institution} {institutionLink} />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
  }
</style>
