<script>
  export let src, styles, alt, cutline;
</script>

<style lang="scss">
  img {
    filter: invert(100%) brightness(0.85);
    object-fit: contain;
    max-height: 100%;
  }

  .image-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;

    pointer-events: none;

    display: flex;
    align-items: center;
  }

  .image-container {
    opacity: 0;
    transition: opacity 0.3s ease;

    :global(.is-active) & {
      opacity: 1;
    }
  }

  .image-container-inner {
    width: calc(100vw - 2rem);
    max-width: calc(100vw - 2rem);
    margin-left: auto;
    margin-right: auto;
    position: relative;
  }

  figure {
    max-height: 90vh;
    width: 100%;
    max-width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  figure.medium {
    width: 20rem;
  }

  figure.large {
    width: 40rem;
  }

  figure.align-right {
    float: right;
  }
</style>

<div class="image-container">
  <div class="image-container-inner">
    <figure class={styles}>
      <img class="lazyload" data-src={'images/' + src} {alt} />
    </figure>
  </div>
</div>
