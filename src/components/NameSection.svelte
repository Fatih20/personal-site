<script lang="ts">
</script>

<main>
  <div id="header-content">
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

  #header-content {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: start;

    /* border: solid 1px white; */
  }

  #header-content * {
    text-align: left;
    margin: 0;
  }

  h1 {
    font-size: 3em;
  }

  h2 {
    font-weight: 600;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
