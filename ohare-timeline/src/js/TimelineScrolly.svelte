<script context="module">
  const onLoad = () => {
    const eventItems = document.querySelectorAll(
      ".tl-event-container .tl-text"
    );

    const eventItemObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.parentNode.classList.add("is-active");
        } else {
          entry.target.parentNode.classList.remove("is-active");
        }
      });
    });

    eventItems.forEach(ei => {
      eventItemObserver.observe(ei);
    });

    const headings = document.querySelectorAll(".timeline-heading");

    const headingObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelector(".timeline").classList.add("hide-all-images");
        } else {
          document
            .querySelector(".timeline")
            .classList.remove("hide-all-images");
        }
      });
    });

    headings.forEach(h => {
      headingObserver.observe(h);
    });
  };

  window.addEventListener("load", onLoad);
</script>

<script>
  import TimelineEvents from "./TimelineEvents.svelte";

  export let content = [];
</script>

<style lang="scss">
  .timeline-heading {
    padding-top: 4rem;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  :global(p:last-of-type) {
    margin-bottom: 0;
  }

  :global(.timeline.is-scrolly) {
    .tl-event-container {
      display: flex;
      flex-direction: column;
      justify-content: center;

      overflow: hidden;
      height: auto;
      min-height: 100vh;

      &:first-of-type .tl-text {
        margin-top: 3rem !important;
      }

      .tl-text {
        margin-top: 90vh;
      }

      .image-container {
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      &.is-active .image-container {
        opacity: 1;
      }

      &.is-active figure {
        pointer-events: all;
      }
    }
  }

  :global(.image-container) {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    pointer-events: none;

    display: flex;
    align-items: center;
  }
</style>

<div class="timeline is-scrolly" id="timeline-inner">
  {#each content as contentItem}
    {#if contentItem.type == 'Heading'}
      <h2 class="timeline-heading">
        <i class="fas fa-plane" />
         {contentItem.value}
      </h2>
    {/if}

    {#if contentItem.type == 'events'}
      <TimelineEvents events={contentItem.value} />
    {/if}
  {/each}
</div>
