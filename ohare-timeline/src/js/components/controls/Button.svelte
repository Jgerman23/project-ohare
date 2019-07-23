<script>
  export let click, disabled;
</script>

<style>
  button {
    background: none;
    color: ivory;
    text-transform: uppercase;
    border: 2px solid currentColor;
    font-size: 1rem;
    margin: 0 0.5rem;
    transition: background 0.3s ease, opacity 0.3s ease;
    padding: 0.5rem;
  }

  button:hover,
  button:focus {
    background: rgba(255, 255, 255, 0.4);
  }

  button[disabled] {
    pointer-events: none;
    opacity: 0;
  }
</style>

<button on:click {disabled}>
  <slot />
</button>
