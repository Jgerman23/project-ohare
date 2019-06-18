<script context="module">
  const onLoad = () => {
    const eventItems = document.querySelectorAll(".tl-event-container");

    window.addEventListener("scroll", function(e) {
      eventItems.forEach(ei => {
        var eiBottom = ei.lastElementChild.getBoundingClientRect().bottom;

        if (eiBottom < 50) {
          ei.style.opacity = 0.2;
        } else if (eiBottom <= 200) {
          ei.style.opacity = eiBottom / 200;
        } else {
          ei.style.opacity = "1";
        }
      });
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
