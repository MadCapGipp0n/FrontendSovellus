<script>
  import Header from '../components/header.svelte';
  import "@fontsource/open-sans";
</script>

<Header/>

<main>
    <slot/>
</main>

<style>
  :global(html) { 
    font-family: 'open-sans', sans-serif;
    background-color: #888484;
    padding: none;
    margin: none;
  }
  :global(body) {
    background-color: #c0bebe;
    max-width: 800px;
    width: 90vw;
    margin: auto;
    min-height: 100vh;
    padding: 0 20px;
  }
</style>