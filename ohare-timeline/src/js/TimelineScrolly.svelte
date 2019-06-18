<script context="module">
  let eventItems;

  const onScroll = () => {
    eventItems.forEach(ei => {
      var eiBottom = ei.querySelector(".tl-event").getBoundingClientRect()
        .bottom;

      if (eiBottom < 0) {
        ei.style.opacity = 0;
        return;
      } else if (eiBottom <= 200) {
        ei.style.opacity = eiBottom / 200;
      } else {
        ei.style.opacity = 1;
      }

      var h = window.innerHeight;
      var eiTop = ei.querySelector(".tl-event").getBoundingClientRect().top;

      if (h - eiTop < 0) {
        ei.style.opacity = 0;
      } else if (h - eiTop <= 200) {
        ei.style.opacity = (h - eiTop) / 200;
      } else {
        ei.style.opacity = 1;
      }
    });
  };

  const onLoad = () => {
    eventItems = document.querySelectorAll(".tl-event-container");

    window.addEventListener("scroll", onScroll);

    onScroll();
  };

  window.addEventListener("load", onLoad);
</script>

<script>
  import TimelineEvents from "./TimelineEvents.svelte";

  export let content = [];
</script>

<style lang="scss">
  .timeline-heading {
    margin-top: 4rem;
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
      min-height: 80vh;

      transition: opacity 0.3s ease;
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

<div class="timeline is-scrolly">
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
