<script lang="ts">
</script>

<main>
  <div class="header-content">
    <h2>Hello! My name is</h2>
    <h1>Fatih Nararya R. I.</h1>
  </div>
</main>

<style>
  main {
    text-align: center;
    margin: 0 auto;
    /* border: solid 1px white; */
  }

  .header-content {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    gap: 1em;
    justify-content: start;

    /* border: solid 1px white; */
  }

  .header-content * {
    text-align: left;
  }

  h1 {
    font-size: 3em;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
